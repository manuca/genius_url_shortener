class CreateUrls < ActiveRecord::Migration[6.0]
  def change
    create_table :urls do |t|
      t.string :url, null: false, unique: true
      t.string :shortcode, null: false, unique: true

      t.timestamps
    end
  end
end
