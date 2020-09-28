A blog theme for Hugo

> It's a port of the [hexo-theme-icarus](https://github.com/ppoffice/hexo-theme-icarus)

[Demo](https://blog.imaple.net/hugo-theme-icarus/) | [中文说明](https://github.com/iMaple/hugo-theme-icarus/blob/master/README-zh.md)

## Preview

![Preview](https://raw.githubusercontent.com/iMaple/imaple.github.io/assets/img/1ff999fb344da440c0828deaef6928c2-3421ed.webp)

## Installation

> Please refer to the [official document](https://gohugo.io/getting-started/quick-start/#step-3-add-a-theme)

Simple steps:

1. Create a site

   ```bash
   hugo new site blog
   cd blog
   git init
   ```
   
2. Load theme

   ```shell
   git submodule add https://github.com/iMaple/hugo-theme-icarus.git themes/icarus
   cp -r themes/icarus/exampleSite/* .
   ```

   Delete the `config.toml` file in the root directory of the site (if it exists).

   ```
   rm -rf config.toml
   ```

3. New article

   ```
   hugo new posts/hello.md
   ```

4. Start local service

   ```
   hugo server -D
   ```

## Config

> Please refer to the original theme [Documents](https://blog.zhangruipeng.me/hexo-theme-icarus/Configuration/icarus-user-guide-configuring-the-theme/)

~~TODO~~

## Upgrade

In the root directory of the site,

```shell
cd themes/icarus
git pull
```

## License

This project is licensed under the [MIT](http://opensource.org/licenses/MIT) License - see the [LICENSE](https://github.com/iMaple/hugo-theme-icarus/blob/master/LICENSE) file for details.

## TODO

- [ ] share
- [ ] open graph
- [ ] structured data

