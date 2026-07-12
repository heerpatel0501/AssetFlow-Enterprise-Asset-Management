from odoo import models, fields, api, _
from odoo.exceptions import UserError

class AssetFlowAsset(models.Model):
    _name = 'asset_flow.asset'
    _description = 'Asset'
    _inherit = ['mail.thread', 'mail.activity.mixin']

    name = fields.Char(string='Asset Name', required=True, tracking=True)
    category_id = fields.Many2one('asset_flow.category', string='Category', required=True, tracking=True)
    asset_tag = fields.Char(string='Asset Tag', required=True, copy=False, readonly=True, default=lambda self: _('New'))
    serial_number = fields.Char(string='Serial Number', tracking=True)
    acquisition_date = fields.Date(string='Acquisition Date')
    acquisition_cost = fields.Float(string='Acquisition Cost')
    
    condition = fields.Selection([
        ('new', 'New'),
        ('good', 'Good'),
        ('fair', 'Fair'),
        ('poor', 'Poor')
    ], string='Condition', default='good', tracking=True)
    
    location = fields.Char(string='Location')
    is_bookable = fields.Boolean(string='Is Shared/Bookable', default=False, tracking=True)
    
    status = fields.Selection([
        ('available', 'Available'),
        ('allocated', 'Allocated'),
        ('reserved', 'Reserved'),
        ('maintenance', 'Under Maintenance'),
        ('lost', 'Lost'),
        ('retired', 'Retired'),
        ('disposed', 'Disposed')
    ], string='Status', default='available', tracking=True)

    allocation_ids = fields.One2many('asset_flow.allocation', 'asset_id', string='Allocations')

    @api.model
    def create(self, vals):
        if vals.get('asset_tag', _('New')) == _('New'):
            vals['asset_tag'] = self.env['ir.sequence'].next_by_code('asset_flow.asset') or _('New')
        return super(AssetFlowAsset, self).create(vals)
