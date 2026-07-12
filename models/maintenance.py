from odoo import models, fields, api, _

class AssetFlowMaintenance(models.Model):
    _name = 'asset_flow.maintenance'
    _description = 'Maintenance Request'
    _inherit = ['mail.thread', 'mail.activity.mixin']

    name = fields.Char(string='Reference', required=True, copy=False, readonly=True, default=lambda self: _('New Request'))
    asset_id = fields.Many2one('asset_flow.asset', string='Asset', required=True, tracking=True)
    requested_by = fields.Many2one('hr.employee', string='Requested By', default=lambda self: self.env.user.employee_id, tracking=True)
    technician_id = fields.Many2one('res.users', string='Assigned Technician', tracking=True)
    
    priority = fields.Selection([
        ('0', 'Low'),
        ('1', 'Normal'),
        ('2', 'High'),
        ('3', 'Urgent')
    ], string='Priority', default='1', tracking=True)
    
    issue_description = fields.Text(string='Issue Description', required=True)
    
    state = fields.Selection([
        ('pending', 'Pending Approval'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('in_progress', 'In Progress'),
        ('resolved', 'Resolved')
    ], string='Status', default='pending', tracking=True)

    @api.model
    def create(self, vals):
        if vals.get('name', _('New Request')) == _('New Request'):
            vals['name'] = self.env['ir.sequence'].next_by_code('asset_flow.maintenance') or _('New Request')
        return super(AssetFlowMaintenance, self).create(vals)

    def action_approve(self):
        for record in self:
            record.state = 'approved'

    def action_reject(self):
        for record in self:
            record.state = 'rejected'

    def action_start_work(self):
        for record in self:
            record.state = 'in_progress'
            record.asset_id.status = 'maintenance'

    def action_resolve(self):
        for record in self:
            record.state = 'resolved'
            # Check if there are other ongoing maintenance requests before marking available
            other_maintenance = self.search([
                ('asset_id', '=', record.asset_id.id),
                ('state', '=', 'in_progress'),
                ('id', '!=', record.id)
            ])
            if not other_maintenance:
                record.asset_id.status = 'available'
