# load_redis_nodejs
load data from csv file into redis with node.js

# install node v8.11.3 LTS 
```
sudo npm cache clean -f
sudo npm install -g n
sudo n 8.11.3
```
- For more details, read: 
- https://stackoverflow.com/questions/7718313/how-to-change-to-an-older-version-of-node-js

# install redis 
```
brew install redis // Mac 
apt-get install redis // Ubuntu
redis-server
```
- For more details, read: 
- https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-redis-on-ubuntu-16-04
- https://medium.com/@petehouston/install-and-config-redis-on-mac-os-x-via-homebrew-eb8df9a4f298


# to run this demo
```
// make sure redis is running
git clone https://github.com/dnielsen/load_redis_nodejs.git
cd load_redis_nodejs
npm install
npm start 
```
# verify data has been loaded
```
redis-cli hgetall "How do I run Redis on Windows?"
redis-cli --scan --pattern '*' // prefered because does not lock
redis-cli keys "*" // not recommended to use KEYS
```
