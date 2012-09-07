class PagesController < ApplicationController
layout nil
  def index
 
    @pages = Page.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @pages }
    end
  end

 
  def show
    @page = Page.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @page }
    end
  end


  def new
    @page = Page.new

    render :layout=>"pageform"
  end


  def edit
    @page = Page.find(params[:id])
  end

  #create the page. Gotta recreate things
  def create
    @page = Page.new

    #see if a page in the database already exists
    @hold = Page.where(:title=>params[:page][:title]).first

    if @hold == nil
    @page.title = params[:page][:title]
    @page.content = params[:page][:content]

    @page.template = params[:page][:template]
    
    @page.title = @page.title.downcase
    @page.save
  flash[:pagesaved] = "Page successfully created"
       redirect_to(:controller=>"admin",:action=>"edit",:id=>@page.id)
    else
        redirect_to(:controller=>"error",:action=>"page_exists")
    end
  end


  def update
    @page = Page.find(params[:id])
    
    respond_to do |format|
      if @page.update_attributes(params[:page])
        format.html { redirect_to(:controller=>"admin",:action=>"edit",:type=>"page",:id=>@page.id, :notice => 'Page was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @page.errors, :status => :unprocessable_entity }
      end
    end
  end

  def destroy
    @page = Page.find(params[:id])
    @page.destroy

    respond_to do |format|
      format.html { redirect_to(pages_url) }
      format.xml  { head :ok }
    end
  end
end
