module ApplicationHelper




  def css(cssname)
    stylesheet_link_tag("themes/"+get_theme_name+"/#{cssname}.css")
  end
  

  def js(jsname)
    javascript_include_tag("themes/"+get_theme_name+"/#{jsname}.js")
  end


 #renders common partials
  def render_common(item)
    @current_theme = get_theme_name
    render :partial=>'layouts/themes/'+get_theme_name+'/'+item+'.html.erb'
  end

  #returns the current theme's name
  def get_theme_name()
        @theme = Settings.where(:setting=>"theme").first
        return @theme.value
  end
  
  
  ######### BROWSER DETECT ##########################
  #this detects based on technology, not browser or version
  def browser_detect
      @agent = request.env['HTTP_USER_AGENT']

      if @agent.include?("Gecko")

        return "gecko"

      else if @agent.include?("AppleWebKit")

        return "webkit"

      else if((@agent.include?("iPad"))||(@agent.include?("iPhone")))

        return "mobile"

      end
    end
  end
  
  #checks to see if a email has been sent, if so render a jgrowl message saying so
  def checkMessageSent
    if flash[:message] != nil
      return raw "<script>
      $(document).ready(function(){
        $.jGrowl(\""+flash[:message]+"\");
  });

  </script>"
    else
      puts "No message sent"
    end
  end
end
  
end
