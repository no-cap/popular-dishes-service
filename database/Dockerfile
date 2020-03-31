FROM mysql:5.7.29
ADD schema.sql /docker-entrypoint-initdb.d
ENV MYSQL_ROOT_PASSWORD="password"
EXPOSE 3306
