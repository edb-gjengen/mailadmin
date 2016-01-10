# Installation
    apt-get install libldap2-dev python-dev libsasl2-dev libssl-dev ldap-utils libffi-dev
    virtualenv venv
    . venv/bin/activate
    pip install -r requirements.txt
    # Create or modify local_settings.py
    python manage.py migrate

## LDAP
    sudo docker pull osixia/openldap
    sudo docker run -e LDAP_DOMAIN=neuf.no -e LDAP_ORGANISATION="Neuf" -e LDAP_ROOTPASS="toor" -p 389:389 -d osixia/openldap
    ldapadd -D "cn=admin,dc=neuf,dc=no" -w "toor" -f testdata.ldif
    # Verify import
    ldapsearch -x -b dc=neuf,dc=no

## Django postfix dovecot

    
# Development
    python manage.py runserver
    # Log in with username 'test@example.com' and password 'test'
    
# Deploy
    sudo apt install fabric  # system requirement (not in requirements.txt because of lacking python3 support) 
    fab deploy
