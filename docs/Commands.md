# Commands

## Preview

`gulp serve`

On the surface, this task starts a local HTTP server so you can view your site in a browser, but behind the scenes there are some extra tools at work.


## Generate

`gulp generate`

Generates a production ready version of the site with the simple gulp command. This command runs some of the tasks as Preview, with additional tasks aimed at making the site load faster and more efficiently.

## View

`gulp`

Generate a production ready version of the site, start a local express HTTP server and open browser to view the site.


## Clean

`gulp clean`

Cleans the cache files and generated files under (www).

## Deploy

`gulp deploy:gh-pages`

`gulp deploy:heroku`

`gulp deploy:aws-ec`

`gulp deploy:openshift`

`gulp deploy:aws-s3`


## Draft

`gulp draft`

Creates a new article, prompting the user for a layout and title

If layout isn’t defined, it’ll equal the default_layout setting in _config.yml. If the title is more than one word, wrap it with quotation marks.

## Publish

`gulp publish`

Publishes a draft, prompting the user for a layout and title.

If layout isn’t defined, it’ll equal the default_layout setting in _config.yml. If the title is more than one word, wrap it with quotation marks.
