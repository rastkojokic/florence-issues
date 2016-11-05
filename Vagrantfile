Vagrant.configure('2') do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.hostname = "florence-dev-box"

  config.vm.provider "virtualbox" do |v|
    v.memory = 4086
  end

  config.vm.network :forwarded_port, guest: 8001, host: 8001

  config.ssh.username = "vagrant"
  config.ssh.password = "vagrant"

  remote_script_repo = "https://raw.githubusercontent.com/rastkojokic/vagrant-install-scripts/master/install_scripts/"

  config.vm.provision :shell, path: "#{remote_script_repo}pre_install.sh", keep_color: true, privileged: false
  config.vm.provision :shell, path: "#{remote_script_repo}install_git.sh", keep_color: true, privileged: false
  config.vm.provision :shell, path: "#{remote_script_repo}install_oh_my_zsh.sh", keep_color: true, privileged: false
  config.vm.provision :shell, path: "#{remote_script_repo}install_vim.sh", keep_color: true, privileged: false
  config.vm.provision :shell, path: "#{remote_script_repo}install_node.sh", keep_color: true, privileged: false
  config.vm.provision :shell, path: "#{remote_script_repo}install_mongodb.sh", keep_color: true, privileged: false
end
