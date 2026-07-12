from odoo import models, fields, api

class AssetFlowDashboard(models.TransientModel):
    _name = 'asset_flow.dashboard'
    _description = 'AssetFlow Dashboard'

    name = fields.Char(default='Dashboard')
    
    # KPI Fields
    assets_available = fields.Integer(compute='_compute_kpis')
    assets_allocated = fields.Integer(compute='_compute_kpis')
    maintenance_today = fields.Integer(compute='_compute_kpis')
    active_bookings = fields.Integer(compute='_compute_kpis')
    overdue_returns = fields.Integer(compute='_compute_kpis')

    def _compute_kpis(self):
        for record in self:
            Asset = self.env['asset_flow.asset']
            Allocation = self.env['asset_flow.allocation']
            Maintenance = self.env['asset_flow.maintenance']
            Booking = self.env['asset_flow.booking']
            
            record.assets_available = Asset.search_count([('status', '=', 'available')])
            record.assets_allocated = Asset.search_count([('status', '=', 'allocated')])
            
            # Maintenance today (Pending or In Progress)
            record.maintenance_today = Maintenance.search_count([('state', 'in', ['pending', 'in_progress'])])
            
            # Active bookings (Ongoing)
            record.active_bookings = Booking.search_count([('state', '=', 'ongoing')])
            
            # Overdue returns
            today = fields.Date.context_today(self)
            record.overdue_returns = Allocation.search_count([
                ('state', '=', 'approved'), 
                ('expected_return_date', '<', today)
            ])

    def action_open_available(self):
        return {
            'type': 'ir.actions.act_window',
            'name': 'Available Assets',
            'res_model': 'asset_flow.asset',
            'view_mode': 'tree,form',
            'domain': [('status', '=', 'available')]
        }

    def action_open_overdue(self):
        today = fields.Date.context_today(self)
        return {
            'type': 'ir.actions.act_window',
            'name': 'Overdue Returns',
            'res_model': 'asset_flow.allocation',
            'view_mode': 'tree,form',
            'domain': [('state', '=', 'approved'), ('expected_return_date', '<', today)]
        }
