class SettingsController < ApplicationController
  def index


  end

######################### THEME SETTINGS ##########################
  #settings for themes
  def theme_settings
    @current_theme = Settings.where(:setting=>"theme").first

    @themes = Dir.entries('app/views/layouts/themes/')




  end

 def change_theme
    @hold = Settings.where(:setting=>"theme").first

    @hold.value = params[:newtheme]
 end
######################### Plugin SETTINGS ##########################
  #settings for plugins
  def plugins

  end
  
  
  #manage media
  def media
    
  end


end
