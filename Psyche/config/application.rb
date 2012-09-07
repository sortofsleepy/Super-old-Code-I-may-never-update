require File.expand_path('../boot', __FILE__)

require 'rails/all'

# If you have a Gemfile, require the gems listed there, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(:default, Rails.env) if defined?(Bundler)

module PsycheCMS
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Custom directories with classes and modules you want to be autoloadable.
    # config.autoload_paths += %W(#{config.root}/extras)

    # Only load the plugins named here, in the order given (default is alphabetical).
    # :all can be used as a placeholder for all plugins not explicitly named.
    # config.plugins = [ :exception_notification, :ssl_requirement, :all ]

    # Activate observers that should always be running.
    # config.active_record.observers = :cacher, :garbage_collector, :forum_observer

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de

    # JavaScript files you want as :defaults (application.js is always included).
    # config.action_view.javascript_expansions[:defaults] = %w(jquery rails)


    # JavaScript files you want as :defaults (application.js is always included).
    config.action_view.javascript_expansions[:defaults] = ['jquery.js','rails.js','twit.js']


    #including jquery UI standards
    config.action_view.javascript_expansions[:ui] = ['jquery.js','ui/jqueryUI.js','ui/jquery.ui.button.js','rails.js']
    
    ActionView::Helpers::AssetTagHelper.register_stylesheet_expansion :uiDefault=>['themes/ui/jquery.ui.all.css','jquery.ui.base.css']
    
    #including the ui elements necessary for settings
    config.action_view.javascript_expansions[:uiSettings] = ['jquery.js','ui/jqueryUI.js','ui/jquery.ui.tabs.js']

    #load the js for the rich text editor
     config.action_view.javascript_expansions[:editor] = ['ckeditor/ckeditor.js','ckeditor/adapters/jquery.js']

    #defaults for effects
    config.action_view.javascript_expansions[:effects] = ['scrollTo.js','easing.js']

    #defaults for syntax highlighting
    config.action_view.javascript_expansions[:syntax] = ['shCore.js','shBrushPhp.js']

    #mobile jquery ui
    config.action_view.javascript_expansions[:uiMobile] = ['jquery.js','uiMobile.js']
    
    # Configure the default encoding used in templates for Ruby 1.9.
    config.encoding = "utf-8"

    # Configure sensitive parameters which will be filtered from the log file.
    config.filter_parameters += [:password]
    
    
    
    
  end
end
