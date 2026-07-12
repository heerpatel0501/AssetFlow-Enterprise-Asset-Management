from odoo import models, fields, api

class AssetCategory(models.Model):
    _name = 'asset_flow.category'
    _description = 'Asset Category'
    _inherit = ['mail.thread', 'mail.activity.mixin']

    name = fields.Char(string='Category Name', required=True, tracking=True)
    description = fields.Text(string='Description')
    has_warranty = fields.Boolean(
        string='Has Warranty', 
        help="Check this if assets in this category typically have a warranty period.",
        default=False
    )
    active = fields.Boolean(default=True)
    
    _sql_constraints = [
        ('name_uniq', 'unique (name)', 'The category name must be unique!')
    ]
