export const ACTIONS = [
  {
    label: 'Choose action',
    actions: [
      {
        value: 'delay-order',
        label: 'Delay order'
      },
      {
        value: 're-assign',
        label: 'Re-assign to pickup'
      },
      {
        value: 'cancel-order',
        label: 'Cancel order'
      }
    ]
  }
];

export const DELIVERYING_ACTIONS = [
  {
    label: 'Choose action',
    actions: [
      {
        value: 're-assign',
        label: 'Re-assign to pickup'
      }
    ]
  },
  {
    label: 'Cancel order',
    actions: [
      {
        value: 'customer-did-not-arrive',
        label: 'Customer did not arrive'
      },
      {
        value: 'responsible-service-of-alchol-issue',
        label: 'Responsible service of alcohol issue'
      },
      {
        value: 'food-damage-or-safety-issue',
        label: 'Food damage or safety issue'
      },
      {
        value: 'other-reason-to-cancel',
        label: 'Other reason to cancel'
      }
    ]
  }
];

export const PICKUP_ACTIONS = [
  {
    label: 'Cancel order',
    actions: [
      {
        value: 'customer-did-not-arrive',
        label: 'Customer did not arrive'
      },
      {
        value: 'responsible-service-of-alchol-issue',
        label: 'Responsible service of alcohol issue'
      },
      {
        value: 'food-damage-or-safety-issue',
        label: 'Food damage or safety issue'
      },
      {
        value: 'other-reason-to-cancel',
        label: 'Other reason to cancel'
      }
    ]
  }
];

export const DELAYS = [
  {
    value: 5 * 60,
    label: '+5 min'
  },
  {
    value: 10 * 60,
    label: '+10 min'
  },
  {
    value: 15 * 60,
    label: '+15 min'
  },
  {
    value: 20 * 60,
    label: '+20 min'
  }
];

export const REASONS = [
  {
    value: 'item-unavailable',
    label: 'item unavailable'
  },
  {
    value: 'other',
    label: 'Other'
  }
];

export const UV_ITEMS = [
  {
    value: 1,
    label: 'Coca Cola'
  },
  {
    value: 2,
    label: "Lay's Chips"
  },
  {
    value: 3,
    label: 'Budweiser Beer'
  }
];

export const UV_SEL_ITEMS_CHOOSE_ACTION = [
  {
    value: 'mark_item_as_uv',
    label: 'Mark item as unavailable in menu'
  },
  {
    value: 'cance_all_orders_with_sel_items',
    label: 'Cancel all orders with selected items'
  }
];
