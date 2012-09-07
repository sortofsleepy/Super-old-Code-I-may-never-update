class ApplicationController < ActionController::Base
  protect_from_forgery


#checks to see if a user if logged in
def session_check(refer)
   if session[:user] == nil
      redirect_to :controller=>"admin", :action=>"login",:refer=>refer
      flash[:notice] = "You haven't logged in!, please login first"
   else
   	return "pass"
   end
end



=begin
Determines how to render a particular
page.

First looks for the current theme,
then looks at the current page and see
what template to use.

Returns the path to the template file
=end

  def get_theme(page)
    #grab the theme folder
    @theme = Settings.where(:setting=>"theme").first

    #grab the current action
   # @action = action_name

    #grab the template
    @template_name = Page.where(:title=>page).first.template

    puts @template_name

    if File.exist?('app/views/layouts/themes/'+@theme.value+'/'+@template_name+".html.erb")
       puts "template exists, loading template"
       return 'layouts/themes/'+@theme.value+'/'+@template_name
    else
      puts "template doens't exist"+'/themes/'+@theme.value+'/'+@template_name
      redirect_to :controller=>"error",:action=>"missing_template"
    end

  end


end
