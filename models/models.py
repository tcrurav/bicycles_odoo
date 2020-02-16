# -*- coding: utf-8 -*-

from odoo import models, fields, api

class bicycles(models.Model):
    _name = 'bicycles.bicycles'

    name = fields.Char()
    stock = fields.Integer()
    description = fields.Text()

    # Methods to open the bikes
    @api.multi
    def open_ui(self):
        """ open the bikes interface """
        self.ensure_one()
        return {
            'type': 'ir.actions.act_url',
            'url':   '/bicycles/web/',
            'target': 'self',
        }