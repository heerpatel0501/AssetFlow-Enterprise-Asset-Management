from odoo import models, fields, api, _
from odoo.exceptions import ValidationError

class AssetFlowBooking(models.Model):
    _name = 'asset_flow.booking'
    _description = 'Resource Booking'
    _inherit = ['mail.thread', 'mail.activity.mixin']

    name = fields.Char(string='Booking Reference', compute='_compute_name')
    asset_id = fields.Many2one('asset_flow.asset', string='Resource', required=True, domain=[('is_bookable', '=', True)], tracking=True)
    employee_id = fields.Many2one('hr.employee', string='Booked By', default=lambda self: self.env.user.employee_id, tracking=True)
    
    start_datetime = fields.Datetime(string='Start Time', required=True, tracking=True)
    end_datetime = fields.Datetime(string='End Time', required=True, tracking=True)
    
    state = fields.Selection([
        ('upcoming', 'Upcoming'),
        ('ongoing', 'Ongoing'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled')
    ], string='Status', default='upcoming', tracking=True)
    
    notes = fields.Text(string='Booking Notes')

    @api.depends('asset_id', 'start_datetime')
    def _compute_name(self):
        for record in self:
            if record.asset_id and record.start_datetime:
                record.name = f"{record.asset_id.name} ({record.start_datetime.strftime('%Y-%m-%d %H:%M')})"
            else:
                record.name = "New Booking"

    @api.constrains('start_datetime', 'end_datetime', 'asset_id', 'state')
    def _check_overlap(self):
        for record in self:
            if record.state == 'cancelled':
                continue
            if record.end_datetime <= record.start_datetime:
                raise ValidationError(_("End Time must be strictly after Start Time."))
                
            overlapping = self.search([
                ('asset_id', '=', record.asset_id.id),
                ('state', '!=', 'cancelled'),
                ('id', '!=', record.id),
                ('start_datetime', '<', record.end_datetime),
                ('end_datetime', '>', record.start_datetime)
            ])
            if overlapping:
                raise ValidationError(_("Overlap Validation Error: The resource '%s' is already booked during this time.") % record.asset_id.name)

    def action_cancel(self):
        for record in self:
            record.state = 'cancelled'

    def action_complete(self):
        for record in self:
            record.state = 'completed'
