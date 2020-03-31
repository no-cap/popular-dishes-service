FROM mysql:5.7.29
ADD schema.sql /docker-entrypoint-initdb.d
ENV MYSQL_ROOT_PASSWORD="password"

# RUN / start && \
# mysql -u root -p$MYSQL_ROOT_PASSWORD  -e "" 
# && \
# mysql -u root -p${MYSQL_ROOT_PASSWORD}  < /tmp/dump.sql
EXPOSE 3306

# RUN mkdir -p /app
# WORKDIR /app

# RUN "${mysql --uroot}" -e "GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'password'"
