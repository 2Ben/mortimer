class PermissionsController < ApplicationController

  before_filter :login_required, :find_user

  
  # GET /permission/1
  # GET /permission/1.xml
  def show
    @permission = Permission.find(params[:id])

    respond_to do |format|
      format.html { redirect_to(users_url)}
      format.xml  { render :xml => @permission }
    end
  end
  
  def create 
    params[:permission][:admin_user_id]  = current_user.id
    params[:permission][:admin_password] = session[:pwd]
#     if @user.permissions.create(params[:permission])
#       render(:update) do |page|
#         page.replace_html 'permissions', :partial => 'permissions/menu'
#       end
#     else
#       render :text => "There was an error creating the permission.", :status => 500
#     end 

	@permission = @user.permissions.create(params[:permission])
	respond_to do |format|
	  if @permission.save
		format.html	{ redirect_to( edit_user_url(@user, :anchor => "tabs2") )}
		format.xml	{ render :xml => @permission, :status => :created, :location => @permission }
	  else
		format.html { render :action => "new" }
        format.xml  { render :xml => @permission.errors, :status => :unprocessable_entity }
	  end
	end
	rescue ActiveRecord::RecordNotFound 
	  render :text => "Not found."
  end

  def destroy
    @permission = @user.permissions.find(params[:id])
	@permission.destroy
    @user.reload
	respond_to do |format|
	  format.html	{ redirect_to( edit_user_url(@user, :anchor => "tabs2") ) }
	  format.js		{ @current_permission = @permission }
 	  format.xml	{ render :xml => @permission, :status => :destroyed, :location => @permission }
	end
	
#     render(:update) do |page|
#       page.replace_html 'permissions', :partial => 'permissions/menu'
#     end
  end

  protected

    def find_user
      @user = User.find(params[:user_id])
    end

end
