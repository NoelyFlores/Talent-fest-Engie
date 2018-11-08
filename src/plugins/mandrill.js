export const sendDataMandrill = (email,perfile, img1) => {
    let dataEmail={
          'key': 'ZGiSDAUGJIgaCMIqm9ysPA',
      'message': {
          'html': `
              <div style='border:1px solid #777'>
                  <h2 style='
                  background:#072240;
                  color: #fff;
                  width: 100%;
                  text-align: center;
                  top:0;
                  padding: 1em 0em;
                  box-shadow: 0px 2px 10px 0px #c5c5c5;
                  '>Perfil Inteligo</h2>
                  <h3 style='text-align: center'>Hola ${email}</h3>
                  <p style='text-align: center'>Estimado usuario acaba de validar su perfil de inversión el resulto es <strong>${perfile}</strong></p>
                  <img src='${img1}' alt='profile'>
                  <img src='https://github.com/OshinVillegas/hackathon-Inteligo/tree/login/src/assets/inteligo.png' alt='logo'
              <div>`,
          'text': 'de Visitor',
          'subject': 'Validate Inteligo',
          'from_email': 'noely.alis209@laboratoria.la',
          'from_name': 'Inteligo',
          'to': [
              {
                  'email': email,
                  'name': perfile,
                  'type': 'to'
              }
          ],
          'headers': {
              'Reply-To': 'noely.alis209@laboratoria.la'
          }
          },
      'async': false,
      'ip_pool': 'Main Pool',
      'send_at': '2018-08-06 10:00:00'
      };
      $.ajax({
          type: 'POST',
          url: 'https://mandrillapp.com/api/1.0/messages/send.json',
          data: dataEmail,
          success: (msg) => {
          }
      }).done(() => {
        }).fail((e) => {
          throw 'Error!!: '+ e ;
      });
    }