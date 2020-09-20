class CreateImages < ActiveRecord::Migration[6.0]
  def change
    create_table :images do |t|
      t.string :attachment
      t.string :attachment_cache
      t.references :category, foreign_key: true
      t.references :main_image

      t.timestamps
    end
  end
end
