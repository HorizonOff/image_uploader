class ImagesController < ApplicationController
  before_action :set_image, only: [:show]
  before_action :set_current_category, only: %i[index new create]

  def index
    @images = @current_category.images.where(main_image_id: nil)
  end

  def show;  end

  def new
    @image = Image.new
  end

  def create
    @image = Image.new(image_params)
    if @image.save
      flash[:success] = 'Image was successfully created'
      ActionCable.server.broadcast "image_channel",
                                   content: @image
      redirect_to category_images_path
    else
      @main_image_id = params[:image][:main_image_id]
      render :new
    end
  end

  private

  def set_image
    @image = Image.find(params[:id])
  end

  def set_current_category
    @current_category ||= Category.find_by_id(params[:category_id])
  end

  def image_params
    params.require(:image).permit(:main_image_id, :category_id, :attachment, :attachment_cache)
  end
end
