import consumer from "./consumer"
import {getMediumColor} from "../packs/medium_colour"

consumer.subscriptions.create("ImageChannel", {
  received(data) {
    const getPicTemplate = (picData) => {
      return (
        `<div class="category-wrapper">
          <img class="image" alt="${picData.attachment.identifier}" src="${picData.attachment.thumb.url}">
        </div>`
      )
    }

    const getPicTemplateWithUrl = (picData) => {
      return (
        `<div class="category-wrapper">
          <img class="image" alt="${picData.attachment.identifier}" src="${picData.attachment.thumb.url}">
          <a href="/categories/${picData.category_id}/images/${picData.id}" class="category-show">Show</a>
        </div>`
      )
    }

    const updateWrapper = (picData) => {
      const template = picData.main_image_id ? getPicTemplate(picData) : getPicTemplateWithUrl(picData);
      const wrapper = document.querySelector('.container');

      if(wrapper) {
        wrapper.insertAdjacentHTML('beforeend', template);
        getMediumColor();
      }
    }

    updateWrapper(data.content);
  }
});
