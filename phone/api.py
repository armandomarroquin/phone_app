import frappe
from asterisk.ami import AMIClient, SimpleAction

@frappe.whitelist()
def make_call(number):
    try:
        client = AMIClient(address='localhost', port=5038)
        client.login(username='responsable', secret='Inter_3422')
        
        action = SimpleAction(
            'Originate',
            Channel=f'SIP/{number}',
            Context='default',
            Exten='102',  # La extensión que debe marcarse
            Priority=1,
            CallerID='Your Caller ID',  # Asegúrate de usar un Caller ID válido
            Timeout=30000
        )
        
        response = client.send_action(action)
        client.logoff()
        
        if response.response == 'Success':
            return {'success': True}
        else:
            return {'success': False, 'error': response.message}
    except Exception as e:
        frappe.log_error(message=str(e), title="Error al iniciar llamada")
        return {'success': False, 'error': str(e)}
