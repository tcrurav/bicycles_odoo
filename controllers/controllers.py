# -*- coding: utf-8 -*-
import json

from odoo import http
from odoo.http import request

class Bicycles(http.Controller):
    @http.route('/bicycles/bicycles/', auth='public')
    def index(self, **kw):
        return "Hello, world"

    @http.route('/bicycles/bicycles/objects/', auth='public')
    def list(self, **kw):
        return http.request.render('bicycles.listing', {
            'root': '/bicycles/bicycles',
            'objects': http.request.env['bicycles.bicycles'].search([]),
        })

    @http.route('/bicycles/bicycles/objects/<model("bicycles.bicycles"):obj>/', auth='public')
    def object(self, obj, **kw):
        return http.request.render('bicycles.object', {
            'object': obj
        })

    @http.route('/bicycles/web', type='http', auth='user')
    def bicycles_web(self, debug=False, **k):
        # if user not logged in, log him in
        # pos_sessions = request.env['pos.session'].search([
        #     ('state', '=', 'opened'),
        #     ('user_id', '=', request.session.uid),
        #     ('rescue', '=', False)])
        # if not pos_sessions:
        #     return werkzeug.utils.redirect('/web#action=point_of_sale.action_client_pos_menu')
        # pos_sessions.login()
        context = {
            'session_info': json.dumps(request.env['ir.http'].session_info())
        }
        return request.render('bicycles.index', qcontext=context)
    