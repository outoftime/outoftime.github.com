---
title: Installing alternate Ruby versions as optional packages
layout: post
---

As a developer of Ruby libraries and applications, I'd like to make sure my code works in all of the major ruby implementations, but I've also got my "main" Ruby, the one that has been with me through thick and thin and happens to be the version installed on our production servers. The other Rubies need a place on my machine, but I'd like that place to be out of the way and have no chance of conflicting with my main Ruby installation or anything else I've got installed.

Fortunately, the omniscient beings who created the [Filesystem Hierarchy Standard](http://www.pathname.com/fhs/pub/fhs-2.3.html) anticipated this need of mine, and in their wisdom created the `/opt` directory for this purpose. Unlike a normal package installation, which installs files in various places across your file system - `/usr/bin`, `/usr/lib`, `/etc`, `/var`, and the like - optional package installations put everything into a single subdirectory of `/opt`, where they're fairly isolated from the rest of the system.

So, here's how I installed YARV and JRuby as optional packages. This should work for anyone using Linux or Mac OS X<sup>1</sup>:

#### Download the packages

Find a nice directory for downloads.

{% highlight bash %}
$ wget ftp://ftp.ruby-lang.org/pub/ruby/1.9/ruby-1.9.1-p129.tar.gz
$ wget http://dist.codehaus.org/jruby/1.2.0/jruby-bin-1.2.0.tar.gz
{% endhighlight %}

#### Install YARV

{% highlight bash %}
$ sudo mkdir -pv /opt/ruby-1.9.1-p129
$ tar xzvf ruby-1.9.1-p129.tar.gz
$ cd ruby-1.9.1-p129
$ ./configure --prefix=/opt/ruby-1.9.1-p129
$ make
$ sudo make install
{% endhighlight %}

#### Install JRuby

{% highlight bash %}
$ sudo tar -C /opt -xzvf jruby-bin-1.2.0.tar.gz
$ sudo rm -v /opt/jruby-1.2.0/bin/*.bat
{% endhighlight %}

You can also remove most of the directories in the `/opt/jruby-1.2.0/lib/native` directory, except the one that corresponds to your architecture. If in doubt, leaving them all in won't hurt.

#### Installing Gems

Assuming you've got RubyGems installed in your main Ruby installation, you don't need to install it for your other installations - you can simply run the existing `gem` script using the various binaries, and it'll work the way you want (installing the gems inside those optional package directories). For example:

{% highlight bash %}
$ sudo /opt/ruby-1.9.1-p129/bin/ruby -S gem install rake
$ sudo /opt/jruby-1.2.0/bin/jruby -S gem install rake
{% endhighlight %}

Using the small `rubies` script I covered in [this post](http://outofti.me/post/111117383/a-15-line-alternative-to-multiruby) makes the process of installing gems (and doing anything else) in your various ruby versions considerably less painful.

<small><sup>1</sup>If you use MacPorts, which you probably do, you've got a bunch of software installed in a standard hierarchy inside of the `/opt/local` directory. That isn't really the [way it was intended to be used](http://www.pathname.com/fhs/pub/fhs-2.3.html#OPTADDONAPPLICATIONSOFTWAREPACKAGES), but it won't conflict with the installations covered in this post.</small>
