module AdminHelper

  def render_admin_common(item)
  
    render :partial=>'layouts/'+item+'.html.erb'
  end


end
