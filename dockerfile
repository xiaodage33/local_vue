FROM 192.168.10.11/fbss/nginx_for_react:1.16

ADD build/ /usr/share/nginx/html/

RUN chmod 755 -R /usr/share/nginx/html/

EXPOSE 80
ENTRYPOINT ["nginx"]
CMD ["-g","daemon off;"]
