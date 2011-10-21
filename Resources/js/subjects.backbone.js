$(function() {
	Subject = Backbone.Model.extend({
		save: function() {
			
		}
	});
	
	Subjects = Backbone.Collection.extend({
		model: Subject,
		fetch: function() {
			//select * from subjects
			var sql = "SELECT * FROM subjects";
			var res = Phonology.DB.execute(sql);
			
			while (res.isValidRow()) {
				var cid = res.fieldByName('cid');
				var name = res.fieldByName('fname') + ' ' + res.fieldByName('lname');
				var gender = res.fieldByName('gender');
								
				this.add({cid: cid, name: name, gender: gender});
			
				res.next();
			}
		}
	});
	
    SubjectView = Backbone.View.extend({
        tagName : "tr",
        className : "subject",

        render : function() {
        	var html = "<td>" + this.model.get('name') + "</td><td>" + this.model.get('gender') + "<td><button class='app_start_test'>Start Test</button>"; 
            this.el.innerHTML = html;
            return this;
        }
    });
	
	
	UpdatingSubjectView = SubjectView.extend({
        initialize : function(options) {
            this.render = _.bind(this.render, this); 
            this.model.bind('change:name', this.render);
            _(this).bind('click', function() {
            	alert(this.model.name);
            })
        }
    });
		
    UpdatingCollectionView = Backbone.View.extend({
        initialize : function(options) {
            _(this).bindAll('add', 'remove');

            if (!options.childViewConstructor) throw "no child view constructor provided";
            if (!options.childViewTagName) throw "no child view tag name provided";

            this._childViewConstructor = options.childViewConstructor;
            this._childViewTagName = options.childViewTagName;
            
            this._childViews = [];
            
            this.collection.each(this.add);
            
            this.collection.bind('add', this.add);
            this.collection.bind('remove', this.remove);
        },

        add : function(model) {
            var childView = new this._childViewConstructor({
                tagName : this._childViewTagName,
                model : model
            });

            this._childViews.push(childView);

            if (this._rendered) {
                $(this.el).append(childView.render().el);
            }
        },

        remove : function(model) {
            var viewToRemove = _(this._childViews).select(function(cv) { return cv.model === model; })[0];
            this._childViews = _(this._childViews).without(viewToRemove);

            if (this._rendered) $(viewToRemove.el).remove();
        },

        render : function() {
            var that = this;
            this._rendered = true;

            $(this.el).empty();

            _(this._childViews).each(function(childView) {
                $(that.el).append(childView.render().el);
            });

            return this;
        }
    });    
})