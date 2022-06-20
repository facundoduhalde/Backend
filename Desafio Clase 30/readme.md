# Desafío Clase 30

## Servidor con balance de carga

### Resolución

Se realizó directamente con pm2 ya que este por parámetro permite recibir si se desea que sea modo fork o modo cluster.

Generamos 4 clusters en 8082, 8083, 8084 y 8085

```console

┬─[duhaldefe@NB030BA:~/Desktop/Carrera Full Stack Coder/Coderhouse -Backend/Desafio Clase 30]
╰─>$ pm2 start ./src/server.js --name="ClusterEn8082" --watch -i 2  -- -p 8082

┬─[duhaldefe@NB030BA:~/Desktop/Carrera Full Stack Coder/Coderhouse -Backend/Desafio Clase 30]
╰─>$ pm2 start ./src/server.js --name="ClusterEn8083" --watch -i 2  -- -p 8083

┬─[duhaldefe@NB030BA:~/Desktop/Carrera Full Stack Coder/Coderhouse -Backend/Desafio Clase 30]
╰─>$ pm2 start ./src/server.js --name="ClusterEn8084" --watch -i 2  -- -p 8084

┬─[duhaldefe@NB030BA:~/Desktop/Carrera Full Stack Coder/Coderhouse -Backend/Desafio Clase 30]
╰─>$ pm2 start ./src/server.js --name="ClusterEn8085" --watch -i 2  -- -p 8085

```



Comprobamos la lista:

```console

┬─[duhaldefe@NB030BA:~/Desktop/Carrera Full Stack Coder/Coderhouse -Backend/Desafio Clase 30]
╰─>$ pm2 list
┌─────┬──────────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name             │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼──────────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0   │ ClusterEn8082    │ default     │ 1.0.0   │ cluster │ 17066    │ 48s    │ 1    │ online    │ 0%       │ 70.0mb   │ duhaldefe  │ enabled  │
│ 1   │ ClusterEn8082    │ default     │ 1.0.0   │ cluster │ 17072    │ 48s    │ 1    │ online    │ 0%       │ 70.2mb   │ duhaldefe  │ enabled  │
│ 2   │ ClusterEn8083    │ default     │ 1.0.0   │ cluster │ 17084    │ 48s    │ 1    │ online    │ 0%       │ 69.5mb   │ duhaldefe  │ enabled  │
│ 3   │ ClusterEn8083    │ default     │ 1.0.0   │ cluster │ 17078    │ 48s    │ 1    │ online    │ 0%       │ 69.6mb   │ duhaldefe  │ enabled  │
│ 4   │ ClusterEn8084    │ default     │ 1.0.0   │ cluster │ 17259    │ 37s    │ 0    │ online    │ 0%       │ 70.6mb   │ duhaldefe  │ enabled  │
│ 5   │ ClusterEn8084    │ default     │ 1.0.0   │ cluster │ 17266    │ 37s    │ 0    │ online    │ 0%       │ 70.7mb   │ duhaldefe  │ enabled  │
│ 6   │ ClusterEn8085    │ default     │ 1.0.0   │ cluster │ 17368    │ 30s    │ 0    │ online    │ 0%       │ 70.5mb   │ duhaldefe  │ enabled  │
│ 7   │ ClusterEn8085    │ default     │ 1.0.0   │ cluster │ 17375    │ 30s    │ 0    │ online    │ 0%       │ 71.1mb   │ duhaldefe  │ enabled  │
└─────┴──────────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘

```

Ahora solamente debemos editar nuestro archivo de configuración de nginx para redigir cuando se vaya a /test/random que vaya a -> /test/randoms de los servidores creados anteriormente.

Nos movemos donde tenemos el archivo de configuración y lo editamos:

```console

┬─[duhaldefe@NB030BA:/etc/nginx]
╰─>$ sudo nvim nginx.conf
```


```console

events {
}

http {

    upstream backend {
        server 127.0.0.1:8082;
        server 127.0.0.1:8083;
        server 127.0.0.1:8084;
        server 127.0.0.1:8085;
    }
    server {
        listen 8080;
        location /test/random/ {
            proxy_pass http://backend/test/randoms/;
        }
    }

}

```



Comprobamos que la sintáxis sea correcta:

```console

─[duhaldefe@NB030BA:/etc/nginx]
╰─>$ sudo nginx -t
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful

```

Frenamos y volvemos a prender el servicio

```console

┬─[duhaldefe@NB030BA:/etc/nginx]
╰─>$ sudo service nginx stop
┬─[duhaldefe@NB030BA:/etc/nginx]
╰─>$ sudo service nginx start

```

Y listo, podemos acceder a través de http://localhost:8080/test/random/

Agregamos un log cuando se genere la lista y podemos comprobarlo a través de **pm2 monit**

```console

┬─[duhaldefe@NB030BA:/etc/nginx]
╰─>$ pm2 monit


┌─ Process List ───────────────────────┐┌──  ClusterEn8084 Logs  ────────────────────────────────────────────────────────────────────┐
│[ 0] ClusterEn8082     Mem:  69 MB    ││ ClusterEn8084 > Lista generada                                                             │
│[ 1] ClusterEn8082     Mem:  71 MB    ││                                                                                            │
│[ 2] ClusterEn8083     Mem:  69 MB    ││                                                                                            │
│[ 3] ClusterEn8083     Mem:  70 MB    ││                                                                                            │
│[ 4] ClusterEn8084     Mem:  71 MB    ││                                                                                            │
│[ 5] ClusterEn8084     Mem:  70 MB    ││                                                                                            │
│[ 6] ClusterEn8085     Mem:  69 MB    ││                                                                                            │
│[ 7] ClusterEn8085     Mem:  72 MB    ││                                                                                            │
│                                      ││                                                                                            │
                                            [...]

```
