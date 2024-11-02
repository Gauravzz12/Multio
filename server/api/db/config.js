require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.AIVENPORT,
  database: process.env.PGDATABASE,
  ssl: {
    rejectUnauthorized: true,
    ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUD678JeeQKUZefFyad8OqQNugg2MwDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvZTg4ZmFjYzQtYWU0ZC00MmIwLWI5ODAtODNjOGM0ZTlk
NDVkIFByb2plY3QgQ0EwHhcNMjQxMDAyMTYyNTQ1WhcNMzQwOTMwMTYyNTQ1WjA6
MTgwNgYDVQQDDC9lODhmYWNjNC1hZTRkLTQyYjAtYjk4MC04M2M4YzRlOWQ0NWQg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAIwMMZ0h
R2ETPsXw21bho+eJ3Ne/2prRj2I0g70063g2Q0uFtreGoxsmMt8wdQQGxtrTwYgM
/iWkmFIxu/hNwYjHurEWs126lEQvFGiWdByONbY+8W0GR+8WPBvhxXSty0hOwB5z
EQGklzkzYQH+uM81XSYPbFx0oVBRfMFbhcHC+xHEfxBZSPnslbE8vm7ecgREKF2p
wpumo78kkTY5cAWduUg6uw8goPdFwP1o8qhPj/HNI4xQq4tqchwS0LDOwntU6V2M
qCWjGfLQckCDFGruId4FcrQNZsdgu+yG6Ksi4+n3w4kucuC8WJ+vu9ifQ339l/sL
HDGSQUQq66lrxkuXbj8B7g7U4ugBwLpvBIK6MUpVSxgTpkx/rgulF7lsz8ufp+Os
e0ZW3ScZNVPo9c0F48kHjX9SG/eeNFfiGgFWHCzUvdS2C34nh5xyrCsgIqIsNftc
i9woFwOvr0NGeV9c97jCpgqy/33TZ3wF/qFYpu6L+2tWWQath3TdfK9gwwIDAQAB
oz8wPTAdBgNVHQ4EFgQU0IeG7SpakyF5g4mAAhOAwDm3YWUwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAE9at+KYDHyHx5Cc
HmRXJhdOrG9fgo7dGXG5q0dLwShua0PxlPCzeRMDC7mtEkMsruGr0H4BGI8/6Otl
yIriKaIwWm48sytSLoOp6jNPHNXDRYQtfPoafE8rIks4bJuQEmhM3ZuKWI7nMPBX
foCVPzkxoTWEv5CeQr6fHsWK9Pv7uit5/H8bblgKS1uTGVkifKRyjlOD3FPTNGQ9
xAAOu2dBOCKOjG0S3ozqSvPwb79BeOjzbrV2sZR10IlJCAqDxwfFaHdRiLdKIc2M
o6bnmtMLJLiqKftHtwnqulrNp+TpwU52eHSUGfcZpdcVxMROi2p1vRgbM1RFox9s
4zfO7hzPFl4fx1QegCdvfArY/1Xfbz5F6o9aYAD+pc+r7Vh6dKRWxMyDaDu6Ke3E
Z8UmoyR2sJjUDqBP0rrL2VsT3oqIt5hyANEvR0zGlo/peJ3qK5dPHgp+GVr6glMS
6mUYZoYBgh5pa+gVM2L5WVJvo6AsU5gQ2xjSKUQHOWX0XbZDJw==
-----END CERTIFICATE-----
`,
  },
});

module.exports = { pool };