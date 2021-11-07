# coding:utf-8
import socket

host, port = ("", 5566)

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

s.bind((host, port))

print("le serveur est demarre")

while True:
    s.listen(5)
    conn, add = s.accept()

    print("un client vient de se connecter")

    data = conn.recv(2048)
    data = data.decode("utf8")

conn.close()
s.close()
