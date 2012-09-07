class ErrorController < ApplicationController
  layout 'error'
  def page_not_found
  	@title = "The page requested was not found"
  end

  def post_not_found
  	@title = "The post requested was not found"
  end

  def missing_template
    @title = "The template required is missing"
  end

  #handles generalized errors
  def general

  end

  def no_content
    @title = "We Couldn't find what you're looking for!"
  end

  def security_violation
    @title = "Security Violation"

    
  end


  
end
