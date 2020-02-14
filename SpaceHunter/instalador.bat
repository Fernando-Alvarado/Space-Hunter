cd ../..
xampp_start.exe
cd mysql/bin
mysql -u root < ../../htdocs/SpaceHunter/Statics/Databases/spacehunter.sql
cd ../..
xampp_stop.exe
cd htdocs/SpaceHunter