;
; BIND data file for local loopback interface
;
$TTL    604800
@       IN      SOA     example.com. root.example.com. (
                              2         ; Serial
                         604800         ; Refresh
                          86400         ; Retry
                        2419200         ; Expire
                         604800 )       ; Negative Cache TTL
;        IN      A        192.168.1.5
;
@       IN      NS      example.com.
@       IN      A       192.168.1.5
example.com.    IN      A       192.168.1.5

;@       IN      NS      ns.example.com.
;@       IN      AAAA    ::1
;ns      IN      A       192.168.1.5


; Example A Record Addresses;
; A Records are hostname->ip mappings
firewall            IN      A       127.0.0.1
something           IN      A       127.0.0.1
other               IN      A       127.0.0.1

; Example Canonical Name entries;
; CNAME's are hostname aliases that point to other host
server01            IN      CNAME   something.example.com
server02            IN      CNAME   other.example.com
www                 IN      CNAME   example.com.
