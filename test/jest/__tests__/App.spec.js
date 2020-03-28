/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import CustomerChip from '../../../src/components/customer/CustomerChip.vue'
import * as All from 'quasar'
// import langEn from 'quasar/lang/en-us' // change to any language you wish! => this breaks wallaby :(
const { Quasar, date } = All

const components = Object.keys(All).reduce((object, key) => {
  const val = All[key]
  if (val && val.component && val.component.name != null) {
    object[key] = val
  }
  return object
}, {})

describe('Mount Quasar', () => {
  const localVue = createLocalVue()
  localVue.use(Quasar, { components }) // , lang: langEn

  const wrapper = mount(CustomerChip, {
    localVue,
    propsData: {
      customer: {
        name: 'Jean, Inc.'
      }
    },
    mocks: {
      $customers: {
        meta: {
          color: 'pink'
        }
      }
    }
  })
  const vm = wrapper.vm

  it('passes the sanity check and creates a wrapper', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('accesses the shallowMount', () => {
    expect(wrapper.text()).toContain('Jean, Inc')
  })
})
