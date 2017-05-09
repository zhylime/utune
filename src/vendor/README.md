FE Lab > Vendor Sources
=================

Instructions
-------------

Using browserify and shimming JS by experience introduces tight coupling problems. Instead we will simply use 3rd party or vendor scripts as droplets in the vendor/js directory.

These scripts will be concatenated together into one build/assets/js/vendor.min.js file.

Simply drop the distributed version of the vendor script into the vendor/js directory. It will be automatically included into the final vendor build. If you wish to keep a file in vendor/js out of the build, but not ready to delete, simply change the extension of the file to filename._js. This also helps other developers know what is in use and what isn't. It is encouraged that unused libraries be kept out of the build to keep file size small.