# Initial setup

1.  Use

          npm install

2.  To be able to use Auth0 you will need a .env file containing the following:

          VITE_AUTH0_DOMAIN=your-auth0-domain.eu.auth0.com
          VITE_AUTH0_CLIENT_ID=your-auth0-client-id

3.  Run the following command in a bash terminal, this is necessary to be able to receive notifications.

          ./set_up_kafka.sh

    Alternatively, you can use, if you have it installed (with the previous command)

          ./start_kafka.sh

    In case you are using VS code, you might have to unset some environment variables.

          unset GIO_MODULE_DIR
          unset GTK_PATH

4.  You can start the frontend with:

           npm run dev
