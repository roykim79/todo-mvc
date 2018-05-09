// Our overall **AppView** is the top-level piece of UI.
AppView = Backbone.View.extend({
  // Instead of generating a new element, bind to the existing skeleton of
  // the App already present in the HTML.
  el: '.todoapp',

  views: [],

  events: {
    'keypress .new-todo': 'createOnEnter',
    'click .destroy': 'removeOne',
    'click .all': 'showAll',
    'click .active': 'showActive',
    'click .completed': 'showCompleted'
  },

  // At initialization we bind to the relevant events on the `Todos`
  // collection, when items are added.
  initialize: function() {
    this.$input = this.$('.new-todo');
    this.$list = $('.todo-list');

    this.listenTo(this.model, 'add', this.addOne);
    this.listenTo(this.model, 'remove', this.removeView);
  },

  addOne: function(tododdd) {
    console.log(tododdd)
    var view = new TodoView({model: tododdd});

    this.views.push(view);

    this.$list.append(view.render().el);
  },

  createOnEnter: function(e) {
    if (e.keyCode === 13 && this.$input.val()) {
      this.model.add({
        title: this.$input.val()
      });

      this.$input.val('');
    }
  },

  removeView: function(todo) {
    var toRemove = this.views.find(function(item) {
      return item.model.cid == todo.cid;
    });

    toRemove.remove();

    this.views.splice(toRemove, 1);
  },

  showAll: function() {},

  showActive: function() {},

  showCompleted: function() {}
});
