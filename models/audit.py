from odoo import models, fields, api, _

class AssetFlowAudit(models.Model):
    _name = 'asset_flow.audit'
    _description = 'Asset Audit Cycle'
    _inherit = ['mail.thread', 'mail.activity.mixin']

    name = fields.Char(string='Audit Reference', required=True, copy=False, readonly=True, default=lambda self: _('New Audit'))
    department_id = fields.Many2one('hr.department', string='Department Scope', tracking=True)
    auditor_id = fields.Many2one('res.users', string='Assigned Auditor', default=lambda self: self.env.user, tracking=True)
    start_date = fields.Date(string='Start Date', default=fields.Date.context_today)
    end_date = fields.Date(string='End Date')
    
    state = fields.Selection([
        ('draft', 'Draft'),
        ('in_progress', 'In Progress'),
        ('done', 'Closed')
    ], string='Status', default='draft', tracking=True)

    line_ids = fields.One2many('asset_flow.audit.line', 'audit_id', string='Audit Lines')

    @api.model
    def create(self, vals):
        if vals.get('name', _('New Audit')) == _('New Audit'):
            vals['name'] = self.env['ir.sequence'].next_by_code('asset_flow.audit') or _('New Audit')
        return super(AssetFlowAudit, self).create(vals)

    def action_start_audit(self):
        for record in self:
            # Auto-populate assets based on department
            domain = []
            if record.department_id:
                # Find assets allocated to this department, or employees in this department
                allocations = self.env['asset_flow.allocation'].search([
                    ('state', '=', 'approved'),
                    '|',
                    ('department_id', '=', record.department_id.id),
                    ('employee_id.department_id', '=', record.department_id.id)
                ])
                asset_ids = allocations.mapped('asset_id').ids
                domain = [('id', 'in', asset_ids)]
                
            assets = self.env['asset_flow.asset'].search(domain)
            
            lines = []
            for asset in assets:
                lines.append((0, 0, {
                    'asset_id': asset.id,
                    'expected_status': asset.status,
                    'verification_status': 'pending'
                }))
                
            record.line_ids = lines
            record.state = 'in_progress'

    def action_close_audit(self):
        for record in self:
            # Update asset statuses based on audit results
            for line in record.line_ids:
                if line.verification_status == 'missing':
                    line.asset_id.status = 'lost'
                elif line.verification_status == 'damaged':
                    # Automatically raise a maintenance request
                    self.env['asset_flow.maintenance'].create({
                        'asset_id': line.asset_id.id,
                        'issue_description': 'Automatically generated from Audit Cycle: Marked as Damaged.',
                        'priority': '2'
                    })
            record.state = 'done'


class AssetFlowAuditLine(models.Model):
    _name = 'asset_flow.audit.line'
    _description = 'Audit Line'

    audit_id = fields.Many2one('asset_flow.audit', string='Audit', required=True, ondelete='cascade')
    asset_id = fields.Many2one('asset_flow.asset', string='Asset', required=True)
    expected_status = fields.Char(string='Expected Status', readonly=True)
    
    verification_status = fields.Selection([
        ('pending', 'Pending'),
        ('verified', 'Verified'),
        ('missing', 'Missing'),
        ('damaged', 'Damaged')
    ], string='Verification Result', default='pending', required=True)
    
    notes = fields.Text(string='Notes')
