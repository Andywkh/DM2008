#ssh into EC2 instance
sudo ssh -i DM2008.pem ubuntu@<ec2instance public DNS>

#git clone unity build folder and copy to /var/www/
sudo cp -r Build9 /var/www/

#install apache2 and point to build folder of unity webGL game
sudo nano /etc/apache2/sites-available/000-default.conf

https://www.tutsmake.com/install-apache-2-on-aws-ec2-instance-ubuntu-18-04/

https://www.digitalocean.com/community/tutorials/how-to-configure-the-apache-web-server-on-an-ubuntu-or-debian-vps

Creating an AMI:
https://docs.aws.amazon.com/toolkit-for-visual-studio/latest/user-guide/tkv-create-ami-from-instance.html

Creating a Launch Template:
https://docs.aws.amazon.com/autoscaling/ec2/userguide/create-launch-template.html

Pushing new Build Folder into GitHub:
git init
git add .
git commit -a -m "my first commit"
git remote add origin <github http url>
git push -u origin <branch name>