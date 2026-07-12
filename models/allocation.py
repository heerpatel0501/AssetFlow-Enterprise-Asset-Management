from odoo import models, fields, api, _
from odoo.exceptions import ValidationError

class AssetFlowAllocation(models.Model):
    _name = 'asset_flow.allocation'
    _description = 'Asset Allocation'
    _inherit = ['mail.thread', 'mail.activity.mixin']
    _rec_name = 'asset_id'

    asset_id = fields.Many2one('asset_flow.asset', string='Asset', required=True, tracking=True)
    employee_id = fields.Many2one('hr.employee', string='Employee', tracking=True)
    department_id = fields.Many2one('hr.department', string='Department', tracking=True)
    
    allocation_date = fields.Date(string='Allocation Date', default=fields.Date.context_today, required=True, tracking=True)
    expected_return_date = fields.Date(string='Expected Return Date', tracking=True)
    return_date = fields.Date(string='Actual Return Date', tracking=True)
    
    state = fields.Selection([
        ('requested', 'Requested'),
        ('approved', 'Approved'),
        ('returned', 'Returned'),
        ('rejected', 'Rejected')
    ], string='Status', default='requested', tracking=True)

    @api.constrains('asset_id', 'state')
    def _check_double_allocation(self):
        for record in self:
            if record.state in ['requested', 'approved']:
                # Find other active allocations for this asset
                overlapping = self.search([
                    ('asset_id', '=', record.asset_id.id),
                    ('state', 'in', ['requested', 'approved']),
                    ('id', '!=', record.id)
                ])
                if overlapping:
                    held_by = overlapping[0].employee_id.name or overlapping[0].department_id.name
                    raise ValidationError(_("Conflict! This asset is already allocated/requested by %s. You must submit a Transfer Request instead.") % held_by)

    def action_approve(self):
        for record in self:
            record.state = 'approved'
            record.asset_id.status = 'allocated'

    def action_return(self):
        for record in self:
            record.state = 'returned'
            record.return_date = fields.Date.context_today(self)
            record.asset_id.status = 'available'
