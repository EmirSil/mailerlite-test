import { mount } from '@vue/test-utils';
import LandingPageBuilder from '../pages/LandingPageBuilder/index.vue';
import { describe, expect, test, vi } from 'vitest';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowsUpDownLeftRight,
  faPencil,
  faTrash,
  faClone,
  faSave,
} from '@fortawesome/free-solid-svg-icons';
library.add(faPencil, faTrash, faArrowsUpDownLeftRight, faClone, faSave);
import { QuillEditor } from '@vueup/vue-quill';

describe('LandingPageBuilder', async () => {
  test('Renders correctly', async () => {
    const wrapper = mount(LandingPageBuilder, {
      global: {
        components: {
          'font-awesome-icon': FontAwesomeIcon,
        },
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toEqual('Hello!!');
  });
  test('Action menu showing when clicking on block', async () => {
    const wrapper = mount(LandingPageBuilder, {
      global: {
        components: {
          'font-awesome-icon': FontAwesomeIcon,
        },
      },
    });
    await wrapper.vm.$nextTick();

    const draggableElement = wrapper.find('.text-inner-wrapper');
    await draggableElement.trigger('mousedown');
    const menu = wrapper.find('.action-menu-wrapper');
    expect(menu.exists());
  });
  test('Save button displays JSON', async () => {
    const wrapper = mount(LandingPageBuilder, {
      global: {
        components: {
          'font-awesome-icon': FontAwesomeIcon,
        },
      },
    });
    await wrapper.vm.$nextTick();
    vi.spyOn(console, 'log').mockImplementation(() => {});
    const button = wrapper.find('.fab-save-button'); // Replace with the appropriate selector
    await button.trigger('click');
    expect(console.log).toHaveBeenCalled();
  });
  test('Text cloning correctly', async () => {
    const wrapper = mount(LandingPageBuilder, {
      global: {
        components: {
          'font-awesome-icon': FontAwesomeIcon,
        },
      },
    });
    await wrapper.vm.$nextTick();

    const draggableElement = wrapper.find('.text-inner-wrapper');
    await draggableElement.trigger('mousedown');
    const menu = wrapper.find('.action-menu-wrapper');
    expect(menu.exists());
    const cloneIcon = wrapper.find('[data-icon="clone"]');
    await cloneIcon.trigger('click');
    const allTextWrappers = wrapper.findAll('.draggable-text-wrapper');
    expect(allTextWrappers.length).toBe(2);
  });
  test('Image cloning correctly', async () => {
    const wrapper = mount(LandingPageBuilder, {
      global: {
        components: {
          'font-awesome-icon': FontAwesomeIcon,
        },
      },
    });
    await wrapper.vm.$nextTick();
    const draggableElement = wrapper.find('.image-inner-wrapper');
    await draggableElement.trigger('mousedown');
    const menu = wrapper.find('.action-menu-wrapper');
    expect(menu.exists());
    const cloneIcon = wrapper.find('[data-icon="clone"]');
    await cloneIcon.trigger('click');
    const allImageWrappers = wrapper.findAll('.draggable-image-wrapper');
    expect(allImageWrappers.length).toBe(2);
  });
  test('Text deleting correctly', async () => {
    const wrapper = mount(LandingPageBuilder, {
      global: {
        components: {
          'font-awesome-icon': FontAwesomeIcon,
        },
      },
    });
    await wrapper.vm.$nextTick();
    const draggableElement = wrapper.find('.text-inner-wrapper');
    await draggableElement.trigger('mousedown');
    const menu = wrapper.find('.action-menu-wrapper');
    expect(menu.exists());
    const thrashIcon = wrapper.find('[data-icon="trash"]');
    await thrashIcon.trigger('click');
    const allTextWrappers = wrapper.findAll('.draggable-text-wrapper');
    expect(allTextWrappers.length).toBe(0);
  });
  test('Image deleting correctly', async () => {
    const wrapper = mount(LandingPageBuilder, {
      global: {
        components: {
          'font-awesome-icon': FontAwesomeIcon,
        },
      },
    });
    await wrapper.vm.$nextTick();
    const draggableElement = wrapper.find('.image-inner-wrapper');
    await draggableElement.trigger('mousedown');
    const menu = wrapper.find('.action-menu-wrapper');
    expect(menu.exists());
    const thrashIcon = wrapper.find('[data-icon="trash"]');
    await thrashIcon.trigger('click');
    const allImageWrappers = wrapper.findAll('.draggable-image-wrapper');
    expect(allImageWrappers.length).toBe(0);
  });
  test('Editing image working correctly', async () => {
    const wrapper = mount(LandingPageBuilder, {
      global: {
        components: {
          'font-awesome-icon': FontAwesomeIcon,
        },
      },
    });
    await wrapper.vm.$nextTick();
    const draggableElement = wrapper.find('.image-inner-wrapper');
    await draggableElement.trigger('mousedown');
    const menu = wrapper.find('.action-menu-wrapper');
    expect(menu.exists());
    const pencilIcon = wrapper.find('[data-icon="pencil"]');
    await pencilIcon.trigger('click');
    const item = wrapper.findAll('.item')[1];
    await item.trigger('click');
    const select = wrapper.find('.modal-vue3-footer-ok');
    await select.trigger('click');
    const image = wrapper.find('.image-inner-wrapper');
    await wrapper.vm.onEdit({ id: 1, value: '/src/assets/hacker.jpg' });
    const substring = '/src/assets/hacker.jpg';
    const containsSubstring = image.attributes().style.includes(substring);
    expect(containsSubstring).toBe(true);
  });
  test('Editing text working correctly', async () => {
    const wrapper = mount(LandingPageBuilder, {
      global: {
        components: {
          'font-awesome-icon': FontAwesomeIcon,
          QuillEditor,
        },
      },
    });
    await wrapper.vm.$nextTick();
    const draggableElement = wrapper.find('.text-inner-wrapper');
    await draggableElement.trigger('mousedown');
    const menu = wrapper.find('.action-menu-wrapper');
    expect(menu.exists());
    await wrapper.vm.onEdit({ id: 0, value: '<h1>eHello!!</h1>' });
    expect(wrapper.text()).toEqual('eHello!!');
  });
});
