// The DOM element for a todo item...
TodoView = Backbone.View.extend({
  //... is a list tag.
  tagName: 'li',

  // Cache the template function for a single item.
  template: Handlebars.compile($('#item-template').html()),

  events: {
    'click .toggle': 'toggleTodo',
    'click .destroy': 'removeModel'
  },

  initialize: function() {
    this.listenTo(this.model, 'change:completed', this.updateView);
  },

  updateView: function() {
    this.$el.toggleClass('completed');
  },

  toggleTodo: function() {
    this.model.set('completed', !this.model.get('completed'));
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));

    return this;
  },

  removeModel: function() {
    this.model.destroy();
  }
});
