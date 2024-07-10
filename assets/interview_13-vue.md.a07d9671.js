import{_ as p,o,c as t,z as s,a as n,t as l,O as a}from"./chunks/framework.0ad2c99e.js";const x=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"interview/13-vue.md","filePath":"interview/13-vue.md"}'),c={name:"interview/13-vue.md"},i=a('<p><img src="https://cdn.nlark.com/yuque/0/2021/png/1500604/1621612367141-93b24efc-8b06-4c10-8259-586cd8c6c5d5.png?x-oss-process=image%2Fresize%2Cw_1038" alt="Vue面试题.png"></p><h2 id="vue面试题推荐配合鲨鱼哥掘金文章-最全的vue面试题-一起看" tabindex="-1">Vue面试题推荐配合鲨鱼哥掘金文章-最全的Vue面试题 一起看 <a class="header-anchor" href="#vue面试题推荐配合鲨鱼哥掘金文章-最全的vue面试题-一起看" aria-label="Permalink to &quot;Vue面试题推荐配合鲨鱼哥掘金文章-最全的Vue面试题 一起看&quot;">​</a></h2><h2 id="一、vue-基础" tabindex="-1">一、Vue 基础 <a class="header-anchor" href="#一、vue-基础" aria-label="Permalink to &quot;一、Vue 基础&quot;">​</a></h2><h3 id="_1-vue的基本原理" tabindex="-1">1. Vue的基本原理 <a class="header-anchor" href="#_1-vue的基本原理" aria-label="Permalink to &quot;1. Vue的基本原理&quot;">​</a></h3><p>当一个Vue实例创建时，Vue会遍历data中的属性，用 Object.defineProperty（vue3.0使用proxy ）将它们转为 getter/setter，并且在内部追踪相关依赖，在属性被访问和修改时通知变化。 每个组件实例都有相应的 watcher 程序实例，它会在组件渲染的过程中把属性记录为依赖，之后当依赖项的setter被调用时，会通知watcher重新计算，从而致使它关联的组件得以更新。</p><p><img src="https://cdn.nlark.com/yuque/0/2021/png/1500604/1620128979608-f7465ffc-9411-43e3-a6bc-96ab44dd77df.png" alt="0_tB3MJCzh_cB6i3mS-1.png"></p><h3 id="_2-双向数据绑定的原理" tabindex="-1">2. 双向数据绑定的原理 <a class="header-anchor" href="#_2-双向数据绑定的原理" aria-label="Permalink to &quot;2. 双向数据绑定的原理&quot;">​</a></h3><p>Vue.js 是采用<strong>数据劫持</strong>结合<strong>发布者-订阅者模式</strong>的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。主要分为以下几个步骤：</p><ol><li>需要observe的数据对象进行递归遍历，包括子属性对象的属性，都加上setter和getter这样的话，给这个对象的某个值赋值，就会触发setter，那么就能监听到了数据变化</li><li>compile解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图</li><li>Watcher订阅者是Observer和Compile之间通信的桥梁，主要做的事情是: ①在自身实例化时往属性订阅器(dep)里面添加自己 ②自身必须有一个update()方法 ③待属性变动dep.notice()通知时，能调用自身的update()方法，并触发Compile中绑定的回调，则功成身退。</li><li>MVVM作为数据绑定的入口，整合Observer、Compile和Watcher三者，通过Observer来监听自己的model数据变化，通过Compile来解析编译模板指令，最终利用Watcher搭起Observer和Compile之间的通信桥梁，达到数据变化 -&gt; 视图更新；视图交互变化(input) -&gt; 数据model变更的双向绑定效果。</li></ol><p><img src="https://cdn.nlark.com/yuque/0/2021/png/1500604/1618656573096-ebdc520c-5d60-4d12-ad04-5df4ebbb5fe7.png" alt="image"></p><h3 id="_3-使用-object-defineproperty-来进行数据劫持有什么缺点" tabindex="-1">3. 使用 Object.defineProperty() 来进行数据劫持有什么缺点？ <a class="header-anchor" href="#_3-使用-object-defineproperty-来进行数据劫持有什么缺点" aria-label="Permalink to &quot;3. 使用 Object.defineProperty() 来进行数据劫持有什么缺点？&quot;">​</a></h3><p>在对一些属性进行操作时，使用这种方法无法拦截，比如通过下标方式修改数组数据或者给对象新增属性，这都不能触发组件的重新渲染，因为 Object.defineProperty 不能拦截到这些操作。更精确的来说，对于数组而言，大部分操作都是拦截不到的，只是 Vue 内部通过重写函数的方式解决了这个问题。</p><p>在 Vue3.0 中已经不使用这种方式了，而是通过使用 Proxy 对对象进行代理，从而实现数据劫持。使用Proxy 的好处是它可以完美的监听到任何方式的数据改变，唯一的缺点是兼容性的问题，因为 Proxy 是 ES6 的语法。</p><h3 id="_4-mvvm、mvc、mvp的区别" tabindex="-1">4. MVVM、MVC、MVP的区别 <a class="header-anchor" href="#_4-mvvm、mvc、mvp的区别" aria-label="Permalink to &quot;4. MVVM、MVC、MVP的区别&quot;">​</a></h3><p>MVC、MVP 和 MVVM 是三种常见的软件架构设计模式，主要通过分离关注点的方式来组织代码结构，优化开发效率。</p><p>在开发单页面应用时，往往一个路由页面对应了一个脚本文件，所有的页面逻辑都在一个脚本文件里。页面的渲染、数据的获取，对用户事件的响应所有的应用逻辑都混合在一起，这样在开发简单项目时，可能看不出什么问题，如果项目变得复杂，那么整个文件就会变得冗长、混乱，这样对项目开发和后期的项目维护是非常不利的。</p><p><strong>（1）MVC</strong></p><p>MVC 通过分离 Model、View 和 Controller 的方式来组织代码结构。其中 View 负责页面的显示逻辑，Model 负责存储页面的业务数据，以及对相应数据的操作。并且 View 和 Model 应用了观察者模式，当 Model 层发生改变的时候它会通知有关 View 层更新页面。Controller 层是 View 层和 Model 层的纽带，它主要负责用户与应用的响应操作，当用户与页面产生交互的时候，Controller 中的事件触发器就开始工作了，通过调用 Model 层，来完成对 Model 的修改，然后 Model 层再去通知 View 层更新。</p><p><img src="https://cdn.nlark.com/yuque/0/2020/png/1500604/1603814137582-5a9aa62f-0045-4272-bef0-447dedb25596.png" alt="image.png"></p><p>（2）MVVM</p><p>MVVM 分为 Model、View、ViewModel：</p><ul><li>Model代表数据模型，数据和业务逻辑都在Model层中定义；</li><li>View代表UI视图，负责数据的展示；</li><li>ViewModel负责监听Model中数据的改变并且控制视图的更新，处理用户交互操作；</li></ul><p>Model和View并无直接关联，而是通过ViewModel来进行联系的，Model和ViewModel之间有着双向数据绑定的联系。因此当Model中的数据改变时会触发View层的刷新，View中由于用户交互操作而改变的数据也会在Model中同步。</p><p>这种模式实现了 Model和View的数据自动同步，因此开发者只需要专注于数据的维护操作即可，而不需要自己操作DOM。</p><p><img src="https://cdn.nlark.com/yuque/0/2020/png/1500604/1603814104939-8c8ac923-735d-4476-937a-cb1f795ffe84.png" alt="image.png"></p><p><strong>（3）MVP</strong></p><p>MVP 模式与 MVC 唯一不同的在于 Presenter 和 Controller。在 MVC 模式中使用观察者模式，来实现当 Model 层数据发生变化的时候，通知 View 层的更新。这样 View 层和 Model 层耦合在一起，当项目逻辑变得复杂的时候，可能会造成代码的混乱，并且可能会对代码的复用性造成一些问题。MVP 的模式通过使用 Presenter 来实现对 View 层和 Model 层的解耦。MVC 中的Controller 只知道 Model 的接口，因此它没有办法控制 View 层的更新，MVP 模式中，View 层的接口暴露给了 Presenter 因此可以在 Presenter 中将 Model 的变化和 View 的变化绑定在一起，以此来实现 View 和 Model 的同步更新。这样就实现了对 View 和 Model 的解耦，Presenter 还包含了其他的响应逻辑。</p><h3 id="_5-computed-和-watch-的区别" tabindex="-1">5. Computed 和 Watch 的区别 <a class="header-anchor" href="#_5-computed-和-watch-的区别" aria-label="Permalink to &quot;5. Computed 和 Watch 的区别&quot;">​</a></h3><p><strong>对于Computed：</strong></p><ul><li>它支持缓存，只有依赖的数据发生了变化，才会重新计算</li><li>不支持异步，当Computed中有异步操作时，无法监听数据的变化</li><li>computed的值会默认走缓存，计算属性是基于它们的响应式依赖进行缓存的，也就是基于data声明过，或者父组件传递过来的props中的数据进行计算的。</li><li>如果一个属性是由其他属性计算而来的，这个属性依赖其他的属性，一般会使用computed</li><li>如果computed属性的属性值是函数，那么默认使用get方法，函数的返回值就是属性的属性值；在computed中，属性有一个get方法和一个set方法，当数据发生变化时，会调用set方法。</li></ul><p><strong>对于Watch：</strong></p><ul><li><p>它不支持缓存，数据变化时，它就会触发相应的操作</p></li><li><p>支持异步监听</p></li><li><p>监听的函数接收两个参数，第一个参数是最新的值，第二个是变化之前的值</p></li><li><p>当一个属性发生变化时，就需要执行相应的操作</p></li><li><p>监听数据必须是data中声明的或者父组件传递过来的props中的数据，当发生变化时，会触发其他操作，函数有两个的参数：</p></li><li><ul><li>immediate：组件加载立即触发回调函数</li><li>deep：深度监听，发现数据内部的变化，在复杂数据类型中使用，例如数组中的对象发生变化。需要注意的是，deep无法监听到数组和对象内部的变化。</li></ul></li></ul><p>当想要执行异步或者昂贵的操作以响应不断的变化时，就需要使用watch。</p><p><strong>总结：</strong></p><ul><li>computed 计算属性 : 依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed 的值。</li><li>watch 侦听器 : 更多的是<strong>观察</strong>的作用，<strong>无缓存性</strong>，类似于某些数据的监听回调，每当监听的数据变化时都会执行回调进行后续操作。</li></ul><p><strong>运用场景：</strong></p><ul><li>当需要进行数值计算,并且依赖于其它数据时，应该使用 computed，因为可以利用 computed 的缓存特性，避免每次获取值时都要重新计算。</li><li>当需要在数据变化时执行异步或开销较大的操作时，应该使用 watch，使用 watch 选项允许执行异步操作 ( 访问一个 API )，限制执行该操作的频率，并在得到最终结果前，设置中间状态。这些都是计算属性无法做到的。</li></ul><h3 id="_6-computed-和-methods-的区别" tabindex="-1">6. Computed 和 Methods 的区别 <a class="header-anchor" href="#_6-computed-和-methods-的区别" aria-label="Permalink to &quot;6. Computed 和 Methods 的区别&quot;">​</a></h3><p>可以将同一函数定义为一个 method 或者一个计算属性。对于最终的结果，两种方式是相同的</p><p><strong>不同点：</strong></p><ul><li>computed: 计算属性是基于它们的依赖进行缓存的，只有在它的相关依赖发生改变时才会重新求值；</li><li>method 调用总会执行该函数。</li></ul><h3 id="_7-slot是什么-有什么作用-原理是什么" tabindex="-1">7. slot是什么？有什么作用？原理是什么？ <a class="header-anchor" href="#_7-slot是什么-有什么作用-原理是什么" aria-label="Permalink to &quot;7. slot是什么？有什么作用？原理是什么？&quot;">​</a></h3><p>slot又名插槽，是Vue的内容分发机制，组件内部的模板引擎使用slot元素作为承载分发内容的出口。插槽slot是子组件的一个模板标签元素，而这一个标签元素是否显示，以及怎么显示是由父组件决定的。slot又分三类，默认插槽，具名插槽和作用域插槽。</p><ul><li>默认插槽：又名匿名查抄，当slot没有指定name属性值的时候一个默认显示插槽，一个组件内只有有一个匿名插槽。</li><li>具名插槽：带有具体名字的插槽，也就是带有name属性的slot，一个组件可以出现多个具名插槽。</li><li>作用域插槽：默认插槽、具名插槽的一个变体，可以是匿名插槽，也可以是具名插槽，该插槽的不同点是在子组件渲染作用域插槽时，可以将子组件内部的数据传递给父组件，让父组件根据子组件的传递过来的数据决定如何渲染该插槽。</li></ul><p>实现原理：当子组件vm实例化时，获取到父组件传入的slot标签的内容，存放在<code>vm.$slot</code>中，默认插槽为<code>vm.$slot.default</code>，具名插槽为<code>vm.$slot.xxx</code>，xxx 为插槽名，当组件执行渲染函数时候，遇到slot标签，使用<code>$slot</code>中的内容进行替换，此时可以为插槽传递数据，若存在数据，则可称该插槽为作用域插槽。</p><h3 id="_8-过滤器的作用-如何实现一个过滤器" tabindex="-1">8. 过滤器的作用，如何实现一个过滤器 <a class="header-anchor" href="#_8-过滤器的作用-如何实现一个过滤器" aria-label="Permalink to &quot;8. 过滤器的作用，如何实现一个过滤器&quot;">​</a></h3><p>根据过滤器的名称，过滤器是用来过滤数据的，在Vue中使用<code>filters</code>来过滤数据，<code>filters</code>不会修改数据，而是过滤数据，改变用户看到的输出（计算属性 <code>computed</code> ，方法 <code>methods</code> 都是通过修改数据来处理数据格式的输出显示）。</p><p><strong>使用场景：</strong></p><ul><li>需要格式化数据的情况，比如需要处理时间、价格等数据格式的输出 / 显示。</li><li>比如后端返回一个 <strong>年月日的日期字符串</strong>，前端需要展示为 <strong>多少天前</strong> 的数据格式，此时就可以用<code>fliters</code>过滤器来处理数据。</li></ul>',49),r=s("strong",null,"插值表达式",-1),C=s("code",null,"**v-bind**",-1),A=s("strong",null,"表达式",-1),u=s("code",null,"**|**",-1),d=a(`<p>例如，在显示金额，给商品价格添加单位：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;li&gt;商品价格：{{item.price | filterPrice}}&lt;/li&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"> filters: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    filterPrice (price) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      return price ? (&#39;￥&#39; + price) : &#39;--&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span></code></pre></div><h3 id="_9-如何保存页面的当前的状态" tabindex="-1">9. 如何保存页面的当前的状态 <a class="header-anchor" href="#_9-如何保存页面的当前的状态" aria-label="Permalink to &quot;9. 如何保存页面的当前的状态&quot;">​</a></h3><p>既然是要保持页面的状态（其实也就是组件的状态），那么会出现以下两种情况：</p><ul><li>前组件会被卸载</li><li>前组件不会被卸载</li></ul><p>那么可以按照这两种情况分别得到以下方法：</p><p><strong>组件会被卸载：</strong></p><p><strong>（1）将状态存储在LocalStorage / SessionStorage</strong></p><p>只需要在组件即将被销毁的生命周期 <code>componentWillUnmount</code> （react）中在 LocalStorage / SessionStorage 中把当前组件的 state 通过 JSON.stringify() 储存下来就可以了。在这里面需要注意的是组件更新状态的时机。</p><p>比如从 B 组件跳转到 A 组件的时候，A 组件需要更新自身的状态。但是如果从别的组件跳转到 B 组件的时候，实际上是希望 B 组件重新渲染的，也就是不要从 Storage 中读取信息。所以需要在 Storage 中的状态加入一个 flag 属性，用来控制 A 组件是否读取 Storage 中的状态。</p><h5 id="优点" tabindex="-1">优点 <a class="header-anchor" href="#优点" aria-label="Permalink to &quot;优点&quot;">​</a></h5><ul><li>兼容性好，不需要额外库或工具。</li><li>简单快捷，基本可以满足大部分需求。</li></ul><h5 id="缺点" tabindex="-1">缺点 <a class="header-anchor" href="#缺点" aria-label="Permalink to &quot;缺点&quot;">​</a></h5><ul><li>状态通过 JSON 方法储存（相当于深拷贝），如果状态中有特殊情况（比如 Date 对象、Regexp 对象等）的时候会得到字符串而不是原来的值。（具体参考用 JSON 深拷贝的缺点）</li><li>如果 B 组件后退或者下一页跳转并不是前组件，那么 flag 判断会失效，导致从其他页面进入 A 组件页面时 A 组件会重新读取 Storage，会造成很奇怪的现象</li></ul><p><strong>（2）路由传值</strong></p><p>通过 react-router 的 Link 组件的 prop —— to 可以实现路由间传递参数的效果。</p><p>在这里需要用到 state 参数，在 B 组件中通过 history.location.state 就可以拿到 state 值，保存它。返回 A 组件时再次携带 state 达到路由状态保持的效果。</p><h5 id="优点-1" tabindex="-1">优点 <a class="header-anchor" href="#优点-1" aria-label="Permalink to &quot;优点&quot;">​</a></h5><ul><li>简单快捷，不会污染 LocalStorage / SessionStorage。</li><li>可以传递 Date、RegExp 等特殊对象（不用担心 JSON.stringify / parse 的不足）</li></ul><h5 id="缺点-1" tabindex="-1">缺点 <a class="header-anchor" href="#缺点-1" aria-label="Permalink to &quot;缺点&quot;">​</a></h5><ul><li>如果 A 组件可以跳转至多个组件，那么在每一个跳转组件内都要写相同的逻辑。</li></ul><p><strong>组件不会被卸载：</strong></p><p><strong>（1）单页面渲染</strong></p><p>要切换的组件作为子组件全屏渲染，父组件中正常储存页面状态。</p><h5 id="优点-2" tabindex="-1">优点 <a class="header-anchor" href="#优点-2" aria-label="Permalink to &quot;优点&quot;">​</a></h5><ul><li>代码量少</li><li>不需要考虑状态传递过程中的错误</li></ul><h5 id="缺点-2" tabindex="-1">缺点 <a class="header-anchor" href="#缺点-2" aria-label="Permalink to &quot;缺点&quot;">​</a></h5><ul><li>增加 A 组件维护成本</li><li>需要传入额外的 prop 到 B 组件</li><li>无法利用路由定位页面</li></ul><p>除此之外，在Vue中，还可以是用keep-alive来缓存页面，当组件在keep-alive内被切换时组件的<strong>activated、deactivated</strong>这两个生命周期钩子函数会被执行</p><p>被包裹在keep-alive中的组件的状态将会被保留：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;keep-alive&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;router-view v-if=&quot;$route.meta.keepAlive&quot;&gt;&lt;/router-view&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/kepp-alive&gt;</span></span></code></pre></div><p><strong>router.js</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  path: &#39;/&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  name: &#39;xxx&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  component: ()=&gt;import(&#39;../src/views/xxx.vue&#39;),</span></span>
<span class="line"><span style="color:#A6ACCD;">  meta:{</span></span>
<span class="line"><span style="color:#A6ACCD;">    keepAlive: true // 需要被缓存</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">},</span></span></code></pre></div><h3 id="_10-常见的事件修饰符及其作用" tabindex="-1">10. 常见的事件修饰符及其作用 <a class="header-anchor" href="#_10-常见的事件修饰符及其作用" aria-label="Permalink to &quot;10. 常见的事件修饰符及其作用&quot;">​</a></h3><ul><li><code>.stop</code>：等同于 JavaScript 中的 <code>event.stopPropagation()</code> ，防止事件冒泡；</li><li><code>.prevent</code> ：等同于 JavaScript 中的 <code>event.preventDefault()</code> ，防止执行预设的行为（如果事件可取消，则取消该事件，而不停止事件的进一步传播）；</li><li><code>.capture</code> ：与事件冒泡的方向相反，事件捕获由外到内；</li><li><code>.self</code> ：只会触发自己范围内的事件，不包含子元素；</li><li><code>.once</code> ：只会触发一次。</li></ul><h3 id="_11-v-if、v-show、v-html-的原理" tabindex="-1">11. v-if、v-show、v-html 的原理 <a class="header-anchor" href="#_11-v-if、v-show、v-html-的原理" aria-label="Permalink to &quot;11. v-if、v-show、v-html 的原理&quot;">​</a></h3><ul><li>v-if会调用addIfCondition方法，生成vnode的时候会忽略对应节点，render的时候就不会渲染；</li><li>v-show会生成vnode，render的时候也会渲染成真实节点，只是在render过程中会在节点的属性中修改show属性值，也就是常说的display；</li><li>v-html会先移除节点下的所有节点，调用html方法，通过addProp添加innerHTML属性，归根结底还是设置innerHTML为v-html的值。</li></ul><h3 id="_13-v-if和v-show的区别" tabindex="-1">13. v-if和v-show的区别 <a class="header-anchor" href="#_13-v-if和v-show的区别" aria-label="Permalink to &quot;13. v-if和v-show的区别&quot;">​</a></h3><ul><li><strong>手段</strong>：v-if是动态的向DOM树内添加或者删除DOM元素；v-show是通过设置DOM元素的display样式属性控制显隐；</li><li><strong>编译过程</strong>：v-if切换有一个局部编译/卸载的过程，切换过程中合适地销毁和重建内部的事件监听和子组件；v-show只是简单的基于css切换；</li><li><strong>编译条件</strong>：v-if是惰性的，如果初始条件为假，则什么也不做；只有在条件第一次变为真时才开始局部编译; v-show是在任何条件下，无论首次条件是否为真，都被编译，然后被缓存，而且DOM元素保留；</li><li><strong>性能消耗</strong>：v-if有更高的切换消耗；v-show有更高的初始渲染消耗；</li><li><strong>使用场景</strong>：v-if适合运营条件不大可能改变；v-show适合频繁切换。</li></ul><h3 id="_14-v-model-是如何实现的-语法糖实际是什么" tabindex="-1">14. v-model 是如何实现的，语法糖实际是什么？ <a class="header-anchor" href="#_14-v-model-是如何实现的-语法糖实际是什么" aria-label="Permalink to &quot;14. v-model 是如何实现的，语法糖实际是什么？&quot;">​</a></h3><p><strong>（1）作用在表单元素上</strong></p><p>动态绑定了 input 的 value 指向了 messgae 变量，并且在触发 input 事件的时候去动态把 message设置为目标值：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;input v-model=&quot;sth&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">//  等同于</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;input </span></span>
<span class="line"><span style="color:#A6ACCD;">    v-bind:value=&quot;message&quot; </span></span>
<span class="line"><span style="color:#A6ACCD;">    v-on:input=&quot;message=$event.target.value&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">//$event 指代当前触发的事件对象;</span></span>
<span class="line"><span style="color:#A6ACCD;">//$event.target 指代当前触发的事件对象的dom;</span></span>
<span class="line"><span style="color:#A6ACCD;">//$event.target.value 就是当前dom的value值;</span></span>
<span class="line"><span style="color:#A6ACCD;">//在@input方法中，value =&gt; sth;</span></span>
<span class="line"><span style="color:#A6ACCD;">//在:value中,sth =&gt; value;</span></span></code></pre></div><p><strong>（2）作用在组件上</strong></p><p>在自定义组件中，v-model 默认会利用名为 value 的 prop和名为 input 的事件</p><p>**本质是一个父子组件通信的语法糖，通过prop和$.emit实现。**因此父组件 v-model 语法糖本质上可以修改为：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;child :value=&quot;message&quot;  @input=&quot;function(e){message = e}&quot;&gt;&lt;/child&gt;</span></span></code></pre></div><p>在组件的实现中，可以通过 v-model属性来配置子组件接收的prop名称，以及派发的事件名称。</p><p>例子：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// 父组件</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;aa-input v-model=&quot;aa&quot;&gt;&lt;/aa-input&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">// 等价于</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;aa-input v-bind:value=&quot;aa&quot; v-on:input=&quot;aa=$event.target.value&quot;&gt;&lt;/aa-input&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 子组件：</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;input v-bind:value=&quot;aa&quot; v-on:input=&quot;onmessage&quot;&gt;&lt;/aa-input&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">props:{value:aa,}</span></span>
<span class="line"><span style="color:#A6ACCD;">methods:{</span></span>
<span class="line"><span style="color:#A6ACCD;">    onmessage(e){</span></span>
<span class="line"><span style="color:#A6ACCD;">        $emit(&#39;input&#39;,e.target.value)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>默认情况下，一个组件上的v-model 会把 value 用作 prop且把 input 用作 event。但是一些输入类型比如单选框和复选框按钮可能想使用 value prop 来达到不同的目的。使用 model 选项可以回避这些情况产生的冲突。js 监听input 输入框输入数据改变，用oninput，数据改变以后就会立刻出发这个事件。通过input事件把数据$emit 出去，在父组件接受。父组件设置v-model的值为input $emit过来的值。</p><h3 id="_15-v-model-可以被用在自定义组件上吗-如果可以-如何使用" tabindex="-1">15. v-model 可以被用在自定义组件上吗？如果可以，如何使用？ <a class="header-anchor" href="#_15-v-model-可以被用在自定义组件上吗-如果可以-如何使用" aria-label="Permalink to &quot;15. v-model 可以被用在自定义组件上吗？如果可以，如何使用？&quot;">​</a></h3><p>可以。v-model 实际上是一个语法糖，如：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;input v-model=&quot;searchText&quot;&gt;</span></span></code></pre></div><p>实际上相当于：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;input</span></span>
<span class="line"><span style="color:#A6ACCD;">  v-bind:value=&quot;searchText&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  v-on:input=&quot;searchText = $event.target.value&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">&gt;</span></span></code></pre></div><p>用在自定义组件上也是同理：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;custom-input v-model=&quot;searchText&quot;&gt;</span></span></code></pre></div><p>相当于：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;custom-input</span></span>
<span class="line"><span style="color:#A6ACCD;">  v-bind:value=&quot;searchText&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  v-on:input=&quot;searchText = $event&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">&gt;&lt;/custom-input&gt;</span></span></code></pre></div><p>显然，custom-input 与父组件的交互如下：</p><ol><li>父组件将<code>searchText</code>变量传入custom-input 组件，使用的 prop 名为<code>value</code>；</li><li>custom-input 组件向父组件传出名为<code>input</code>的事件，父组件将接收到的值赋值给<code>searchText</code>；</li></ol><p>所以，custom-input 组件的实现应该类似于这样：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">Vue.component(&#39;custom-input&#39;, {</span></span>
<span class="line"><span style="color:#A6ACCD;">  props: [&#39;value&#39;],</span></span>
<span class="line"><span style="color:#A6ACCD;">  template: \`</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;input</span></span>
<span class="line"><span style="color:#A6ACCD;">      v-bind:value=&quot;value&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      v-on:input=&quot;$emit(&#39;input&#39;, $event.target.value)&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  \`</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span></code></pre></div><h3 id="_16-data为什么是一个函数而不是对象" tabindex="-1">16. data为什么是一个函数而不是对象 <a class="header-anchor" href="#_16-data为什么是一个函数而不是对象" aria-label="Permalink to &quot;16. data为什么是一个函数而不是对象&quot;">​</a></h3><p>JavaScript中的对象是引用类型的数据，当多个实例引用同一个对象时，只要一个实例对这个对象进行操作，其他实例中的数据也会发生变化。</p><p>而在Vue中，更多的是想要复用组件，那就需要每个组件都有自己的数据，这样组件之间才不会相互干扰。</p><p>所以组件的数据不能写成对象的形式，而是要写成函数的形式。数据以函数返回值的形式定义，这样当每次复用组件的时候，就会返回一个新的data，也就是说每个组件都有自己的私有数据空间，它们各自维护自己的数据，不会干扰其他组件的正常运行。</p><h3 id="_17-对keep-alive的理解-它是如何实现的-具体缓存的是什么" tabindex="-1">17. 对keep-alive的理解，它是如何实现的，具体缓存的是什么？ <a class="header-anchor" href="#_17-对keep-alive的理解-它是如何实现的-具体缓存的是什么" aria-label="Permalink to &quot;17. 对keep-alive的理解，它是如何实现的，具体缓存的是什么？&quot;">​</a></h3><p>如果需要在组件切换的时候，保存一些组件的状态防止多次渲染，就可以使用 keep-alive 组件包裹需要保存的组件。</p><p>**（1）**<strong>keep-alive</strong></p><p>keep-alive有以下三个属性：</p><ul><li>include 字符串或正则表达式，只有名称匹配的组件会被匹配；</li><li>exclude 字符串或正则表达式，任何名称匹配的组件都不会被缓存；</li><li>max 数字，最多可以缓存多少组件实例。</li></ul><p>注意：keep-alive 包裹动态组件时，会缓存不活动的组件实例。</p><p><strong>主要流程</strong></p><ol><li>判断组件 name ，不在 include 或者在 exclude 中，直接返回 vnode，说明该组件不被缓存。</li><li>获取组件实例 key ，如果有获取实例的 key，否则重新生成。</li><li>key生成规则，cid +&quot;∶∶&quot;+ tag ，仅靠cid是不够的，因为相同的构造函数可以注册为不同的本地组件。</li><li>如果缓存对象内存在，则直接从缓存对象中获取组件实例给 vnode ，不存在则添加到缓存对象中。 5.最大缓存数量，当缓存组件数量超过 max 值时，清除 keys 数组内第一个组件。</li></ol><p><strong>（2）keep-alive 的实现</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">const patternTypes: Array&lt;Function&gt; = [String, RegExp, Array] // 接收：字符串，正则，数组</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">export default {</span></span>
<span class="line"><span style="color:#A6ACCD;">  name: &#39;keep-alive&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  abstract: true, // 抽象组件，是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在父组件链中。</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  props: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    include: patternTypes, // 匹配的组件，缓存</span></span>
<span class="line"><span style="color:#A6ACCD;">    exclude: patternTypes, // 不去匹配的组件，不缓存</span></span>
<span class="line"><span style="color:#A6ACCD;">    max: [String, Number], // 缓存组件的最大实例数量, 由于缓存的是组件实例（vnode），数量过多的时候，会占用过多的内存，可以用max指定上限</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  created() {</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 用于初始化缓存虚拟DOM数组和vnode的key</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.cache = Object.create(null)</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.keys = []</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  destroyed() {</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 销毁缓存cache的组件实例</span></span>
<span class="line"><span style="color:#A6ACCD;">    for (const key in this.cache) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      pruneCacheEntry(this.cache, key, this.keys)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  mounted() {</span></span>
<span class="line"><span style="color:#A6ACCD;">    // prune 削减精简[v.]</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 去监控include和exclude的改变，根据最新的include和exclude的内容，来实时削减缓存的组件的内容</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.$watch(&#39;include&#39;, (val) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">      pruneCache(this, (name) =&gt; matches(val, name))</span></span>
<span class="line"><span style="color:#A6ACCD;">    })</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.$watch(&#39;exclude&#39;, (val) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">      pruneCache(this, (name) =&gt; !matches(val, name))</span></span>
<span class="line"><span style="color:#A6ACCD;">    })</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p><strong>render函数：</strong></p><ol><li>会在 keep-alive 组件内部去写自己的内容，所以可以去获取默认 slot 的内容，然后根据这个去获取组件</li><li>keep-alive 只对第一个组件有效，所以获取第一个子组件。</li><li>和 keep-alive 搭配使用的一般有：动态组件 和router-view</li></ol><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight has-diff"><code><span class="line"><span style="color:#A6ACCD;">render () {</span></span>
<span class="line"><span style="color:#A6ACCD;">  //</span></span>
<span class="line"><span style="color:#A6ACCD;">  function getFirstComponentChild (children: ?Array&lt;VNode&gt;): ?VNode {</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (Array.isArray(children)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  for (let i = 0; i &lt; children.length; i++) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    const c = children[i]</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (isDef(c) &amp;&amp; (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      return c</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  const slot = this.$slots.default // 获取默认插槽</span></span>
<span class="line"><span style="color:#A6ACCD;">  const vnode: VNode = getFirstComponentChild(slot)// 获取第一个子组件</span></span>
<span class="line"><span style="color:#A6ACCD;">  const componentOptions: ?VNodeComponentOptions = vnode &amp;&amp; vnode.componentOptions // 组件参数</span></span>
<span class="line"><span style="color:#A6ACCD;">  if (componentOptions) { // 是否有组件参数</span></span>
<span class="line"><span style="color:#A6ACCD;">    // check pattern</span></span>
<span class="line"><span style="color:#A6ACCD;">    const name: ?string = getComponentName(componentOptions) // 获取组件名</span></span>
<span class="line"><span style="color:#A6ACCD;">    const { include, exclude } = this</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (</span></span>
<span class="line"><span style="color:#A6ACCD;">      // not included</span></span>
<span class="line"><span style="color:#A6ACCD;">      (include &amp;&amp; (!name || !matches(include, name))) ||</span></span>
<span class="line"><span style="color:#A6ACCD;">      // excluded</span></span>
<span class="line"><span style="color:#A6ACCD;">      (exclude &amp;&amp; name &amp;&amp; matches(exclude, name))</span></span>
<span class="line"><span style="color:#A6ACCD;">    ) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      // 如果不匹配当前组件的名字和include以及exclude</span></span>
<span class="line"><span style="color:#A6ACCD;">      // 那么直接返回组件的实例</span></span>
<span class="line"><span style="color:#A6ACCD;">      return vnode</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    const { cache, keys } = this</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    // 获取这个组件的key</span></span>
<span class="line"><span style="color:#A6ACCD;">    const key: ?string = vnode.key == null</span></span>
<span class="line"><span style="color:#A6ACCD;">      // same constructor may get registered as different local components</span></span>
<span class="line"><span style="color:#A6ACCD;">      // so cid alone is not enough (#3269)</span></span>
<span class="line"><span style="color:#A6ACCD;">      ? componentOptions.Ctor.cid + (componentOptions.tag ? \`::\${componentOptions.tag}\` : &#39;&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">      : vnode.key</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    if (cache[key]) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      // LRU缓存策略执行</span></span>
<span class="line"><span style="color:#A6ACCD;">      vnode.componentInstance = cache[key].componentInstance // 组件初次渲染的时候componentInstance为undefined</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">      // make current key freshest</span></span>
<span class="line"><span style="color:#A6ACCD;">      remove(keys, key)</span></span>
<span class="line"><span style="color:#A6ACCD;">      keys.push(key)</span></span>
<span class="line"><span style="color:#A6ACCD;">      // 根据LRU缓存策略执行，将key从原来的位置移除，然后将这个key值放到最后面</span></span>
<span class="line"><span style="color:#A6ACCD;">    } else {</span></span>
<span class="line"><span style="color:#A6ACCD;">      // 在缓存列表里面没有的话，则加入，同时判断当前加入之后，是否超过了max所设定的范围，如果是，则去除</span></span>
<span class="line"><span style="color:#A6ACCD;">      // 使用时间间隔最长的一个</span></span>
<span class="line"><span style="color:#A6ACCD;">      cache[key] = vnode</span></span>
<span class="line"><span style="color:#A6ACCD;">      keys.push(key)</span></span>
<span class="line"><span style="color:#A6ACCD;">      // prune oldest entry</span></span>
<span class="line"><span style="color:#A6ACCD;">      if (this.max &amp;&amp; keys.length &gt; parseInt(this.max)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        pruneCacheEntry(cache, keys[0], keys, this._vnode)</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 将组件的keepAlive属性设置为true</span></span>
<span class="line"><span style="color:#A6ACCD;">    vnode.data.keepAlive = true // 作用：判断是否要执行组件的created、mounted生命周期函数</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  return vnode || (slot &amp;&amp; slot[0])</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>keep-alive 具体是通过 cache 数组缓存所有组件的 vnode 实例。当 cache 内原有组件被使用时会将该组件 key 从 keys 数组中删除，然后 push 到 keys数组最后，以便清除最不常用组件。</p><p><strong>实现步骤：</strong></p><ol><li>获取 keep-alive 下第一个子组件的实例对象，通过他去获取这个组件的组件名</li><li>通过当前组件名去匹配原来 include 和 exclude，判断当前组件是否需要缓存，不需要缓存，直接返回当前组件的实例vNode</li><li>需要缓存，判断他当前是否在缓存数组里面：</li></ol><ul><li>存在，则将他原来位置上的 key 给移除，同时将这个组件的 key 放到数组最后面（LRU）</li><li>不存在，将组件 key 放入数组，然后判断当前 key数组是否超过 max 所设置的范围，超过，那么削减未使用时间最长的一个组件的 key</li></ul><ol><li>最后将这个组件的 keepAlive 设置为 true</li></ol><p><strong>（3）keep-alive 本身的创建过程和 patch 过程</strong></p><p>缓存渲染的时候，会根据 vnode.componentInstance（首次渲染 vnode.componentInstance 为 undefined） 和 keepAlive 属性判断不会执行组件的 created、mounted 等钩子函数，而是对缓存的组件执行 patch 过程∶ 直接把缓存的 DOM 对象直接插入到目标元素中，完成了数据更新的情况下的渲染过程。</p><p><strong>首次渲染</strong></p><ul><li>组件的首次渲染∶判断组件的 abstract 属性，才往父组件里面挂载 DOM</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// core/instance/lifecycle</span></span>
<span class="line"><span style="color:#A6ACCD;">function initLifecycle (vm: Component) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  const options = vm.$options</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  // locate first non-abstract parent</span></span>
<span class="line"><span style="color:#A6ACCD;">  let parent = options.parent</span></span>
<span class="line"><span style="color:#A6ACCD;">  if (parent &amp;&amp; !options.abstract) { // 判断组件的abstract属性，才往父组件里面挂载DOM</span></span>
<span class="line"><span style="color:#A6ACCD;">    while (parent.$options.abstract &amp;&amp; parent.$parent) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      parent = parent.$parent</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    parent.$children.push(vm)</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  vm.$parent = parent</span></span>
<span class="line"><span style="color:#A6ACCD;">  vm.$root = parent ? parent.$root : vm</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  vm.$children = []</span></span>
<span class="line"><span style="color:#A6ACCD;">  vm.$refs = {}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  vm._watcher = null</span></span>
<span class="line"><span style="color:#A6ACCD;">  vm._inactive = null</span></span>
<span class="line"><span style="color:#A6ACCD;">  vm._directInactive = false</span></span>
<span class="line"><span style="color:#A6ACCD;">  vm._isMounted = false</span></span>
<span class="line"><span style="color:#A6ACCD;">  vm._isDestroyed = false</span></span>
<span class="line"><span style="color:#A6ACCD;">  vm._isBeingDestroyed = false</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><ul><li>判断当前 keepAlive 和 componentInstance 是否存在来判断是否要执行组件 prepatch 还是执行创建 componentlnstance</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// core/vdom/create-component</span></span>
<span class="line"><span style="color:#A6ACCD;">init (vnode: VNodeWithData, hydrating: boolean): ?boolean {</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (</span></span>
<span class="line"><span style="color:#A6ACCD;">      vnode.componentInstance &amp;&amp;</span></span>
<span class="line"><span style="color:#A6ACCD;">      !vnode.componentInstance._isDestroyed &amp;&amp;</span></span>
<span class="line"><span style="color:#A6ACCD;">      vnode.data.keepAlive</span></span>
<span class="line"><span style="color:#A6ACCD;">    ) { // componentInstance在初次是undefined!!!</span></span>
<span class="line"><span style="color:#A6ACCD;">      // kept-alive components, treat as a patch</span></span>
<span class="line"><span style="color:#A6ACCD;">      const mountedNode: any = vnode // work around flow</span></span>
<span class="line"><span style="color:#A6ACCD;">      componentVNodeHooks.prepatch(mountedNode, mountedNode) // prepatch函数执行的是组件更新的过程</span></span>
<span class="line"><span style="color:#A6ACCD;">    } else {</span></span>
<span class="line"><span style="color:#A6ACCD;">      const child = vnode.componentInstance = createComponentInstanceForVnode(</span></span>
<span class="line"><span style="color:#A6ACCD;">        vnode,</span></span>
<span class="line"><span style="color:#A6ACCD;">        activeInstance</span></span>
<span class="line"><span style="color:#A6ACCD;">      )</span></span>
<span class="line"><span style="color:#A6ACCD;">      child.$mount(hydrating ? vnode.elm : undefined, hydrating)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span></code></pre></div><p>prepatch 操作就不会在执行组件的 mounted 和 created 生命周期函数，而是直接将 DOM 插入</p><p><strong>（4）LRU （least recently used）缓存策略</strong></p><p>LRU 缓存策略∶ 从内存中找出最久未使用的数据并置换新的数据。</p><p>LRU（Least rencently used）算法根据数据的历史访问记录来进行淘汰数据，其核心思想是**&quot;如果数据最近被访问过，那么将来被访问的几率也更高&quot;**。 最常见的实现是使用一个链表保存缓存数据，详细算法实现如下∶</p><ul><li>新数据插入到链表头部</li><li>每当缓存命中（即缓存数据被访问），则将数据移到链表头部</li><li>链表满的时候，将链表尾部的数据丢弃。</li></ul><h3 id="_18-nexttick-原理及作用" tabindex="-1">18. $nextTick 原理及作用 <a class="header-anchor" href="#_18-nexttick-原理及作用" aria-label="Permalink to &quot;18. $nextTick 原理及作用&quot;">​</a></h3><p>Vue 的 nextTick 其本质是对 JavaScript 执行原理 EventLoop 的一种应用。</p><p>nextTick 的核心是利用了如 Promise 、MutationObserver、setImmediate、setTimeout的原生 JavaScript 方法来模拟对应的微/宏任务的实现，本质是为了利用 JavaScript 的这些异步回调任务队列来实现 Vue 框架中自己的异步回调队列。</p><p>nextTick 不仅是 Vue 内部的异步队列的调用方法，同时也允许开发者在实际项目中使用这个方法来满足实际应用中对 DOM 更新数据时机的后续逻辑处理</p><p>nextTick 是典型的将底层 JavaScript 执行原理应用到具体案例中的示例，引入异步更新队列机制的原因∶</p><ul><li>如果是同步更新，则多次对一个或多个属性赋值，会频繁触发 UI/DOM 的渲染，可以减少一些无用渲染</li><li>同时由于 VirtualDOM 的引入，每一次状态发生变化后，状态变化的信号会发送给组件，组件内部使用 VirtualDOM 进行计算得出需要更新的具体的 DOM 节点，然后对 DOM 进行更新操作，每次更新状态后的渲染过程需要更多的计算，而这种无用功也将浪费更多的性能，所以异步渲染变得更加至关重要</li></ul><p>Vue采用了数据驱动视图的思想，但是在一些情况下，仍然需要操作DOM。有时候，可能遇到这样的情况，DOM1的数据发生了变化，而DOM2需要从DOM1中获取数据，那这时就会发现DOM2的视图并没有更新，这时就需要用到了<code>nextTick</code>了。</p><p>由于Vue的DOM操作是异步的，所以，在上面的情况中，就要将DOM2获取数据的操作写在<code>$nextTick</code>中。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">this.$nextTick(() =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 获取数据的操作...</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span></code></pre></div><p>所以，在以下情况下，会用到nextTick：</p><ul><li>在数据变化后执行的某个操作，而这个操作需要使用随数据变化而变化的DOM结构的时候，这个操作就需要方法在<code>nextTick()</code>的回调函数中。</li><li>在vue生命周期中，如果在created()钩子进行DOM操作，也一定要放在<code>nextTick()</code>的回调函数中。</li></ul><p>因为在created()钩子函数中，页面的DOM还未渲染，这时候也没办法操作DOM，所以，此时如果想要操作DOM，必须将操作的代码放在<code>nextTick()</code>的回调函数中。</p><h3 id="_19-vue-中给-data-中的对象属性添加一个新的属性时会发生什么-如何解决" tabindex="-1"><strong>19. Vue 中给 data 中的对象属性添加一个新的属性时会发生什么？如何解决？</strong> <a class="header-anchor" href="#_19-vue-中给-data-中的对象属性添加一个新的属性时会发生什么-如何解决" aria-label="Permalink to &quot;**19. Vue 中给 data 中的对象属性添加一个新的属性时会发生什么？如何解决？**&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;template&gt; </span></span>
<span class="line"><span style="color:#A6ACCD;">   &lt;div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;ul&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">         &lt;li v-for=&quot;value in obj&quot; :key=&quot;value&quot;&gt; {{value}} &lt;/li&gt; </span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;/ul&gt; </span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;button @click=&quot;addObjB&quot;&gt;添加 obj.b&lt;/button&gt; </span></span>
<span class="line"><span style="color:#A6ACCD;">   &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    export default { </span></span>
<span class="line"><span style="color:#A6ACCD;">       data () { </span></span>
<span class="line"><span style="color:#A6ACCD;">          return { </span></span>
<span class="line"><span style="color:#A6ACCD;">              obj: { </span></span>
<span class="line"><span style="color:#A6ACCD;">                  a: &#39;obj.a&#39; </span></span>
<span class="line"><span style="color:#A6ACCD;">              } </span></span>
<span class="line"><span style="color:#A6ACCD;">          } </span></span>
<span class="line"><span style="color:#A6ACCD;">       },</span></span>
<span class="line"><span style="color:#A6ACCD;">       methods: { </span></span>
<span class="line"><span style="color:#A6ACCD;">          addObjB () { </span></span>
<span class="line"><span style="color:#A6ACCD;">              this.obj.b = &#39;obj.b&#39; </span></span>
<span class="line"><span style="color:#A6ACCD;">              console.log(this.obj) </span></span>
<span class="line"><span style="color:#A6ACCD;">          } </span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">   }</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span></code></pre></div><p>点击 button 会发现，obj.b 已经成功添加，但是视图并未刷新。这是因为在Vue实例创建时，obj.b并未声明，因此就没有被Vue转换为响应式的属性，自然就不会触发视图的更新，这时就需要使用Vue的全局 api <strong>$set()：</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">addObjB () (</span></span>
<span class="line"><span style="color:#A6ACCD;">   this.$set(this.obj, &#39;b&#39;, &#39;obj.b&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">   console.log(this.obj)</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>$set()方法相当于手动的去把obj.b处理成一个响应式的属性，此时视图也会跟着改变了。</p><h3 id="_20-vue中封装的数组方法有哪些-其如何实现页面更新" tabindex="-1">20. Vue中封装的数组方法有哪些，其如何实现页面更新 <a class="header-anchor" href="#_20-vue中封装的数组方法有哪些-其如何实现页面更新" aria-label="Permalink to &quot;20. Vue中封装的数组方法有哪些，其如何实现页面更新&quot;">​</a></h3><p>在Vue中，对响应式处理利用的是Object.defineProperty对数据进行拦截，而这个方法并不能监听到数组内部变化，数组长度变化，数组的截取变化等，所以需要对这些操作进行hack，让Vue能监听到其中的变化。</p><p><img src="https://cdn.nlark.com/yuque/0/2020/png/1500604/1604019269329-d88e91cf-b33d-4b2d-b014-e5739e9b7dbc.png" alt="image.png"></p><p>那Vue是如何实现让这些数组方法实现元素的实时更新的呢，下面是Vue中对这些方法的封装：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// 缓存数组原型</span></span>
<span class="line"><span style="color:#A6ACCD;">const arrayProto = Array.prototype;</span></span>
<span class="line"><span style="color:#A6ACCD;">// 实现 arrayMethods.__proto__ === Array.prototype</span></span>
<span class="line"><span style="color:#A6ACCD;">export const arrayMethods = Object.create(arrayProto);</span></span>
<span class="line"><span style="color:#A6ACCD;">// 需要进行功能拓展的方法</span></span>
<span class="line"><span style="color:#A6ACCD;">const methodsToPatch = [</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;push&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;pop&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;shift&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;unshift&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;splice&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;sort&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;reverse&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">];</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">/**</span></span>
<span class="line"><span style="color:#A6ACCD;"> * Intercept mutating methods and emit events</span></span>
<span class="line"><span style="color:#A6ACCD;"> */</span></span>
<span class="line"><span style="color:#A6ACCD;">methodsToPatch.forEach(function(method) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  // 缓存原生数组方法</span></span>
<span class="line"><span style="color:#A6ACCD;">  const original = arrayProto[method];</span></span>
<span class="line"><span style="color:#A6ACCD;">  def(arrayMethods, method, function mutator(...args) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 执行并缓存原生数组功能</span></span>
<span class="line"><span style="color:#A6ACCD;">    const result = original.apply(this, args);</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 响应式处理</span></span>
<span class="line"><span style="color:#A6ACCD;">    const ob = this.__ob__;</span></span>
<span class="line"><span style="color:#A6ACCD;">    let inserted;</span></span>
<span class="line"><span style="color:#A6ACCD;">    switch (method) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    // push、unshift会新增索引，所以要手动observer</span></span>
<span class="line"><span style="color:#A6ACCD;">      case &quot;push&quot;:</span></span>
<span class="line"><span style="color:#A6ACCD;">      case &quot;unshift&quot;:</span></span>
<span class="line"><span style="color:#A6ACCD;">        inserted = args;</span></span>
<span class="line"><span style="color:#A6ACCD;">        break;</span></span>
<span class="line"><span style="color:#A6ACCD;">      // splice方法，如果传入了第三个参数，也会有索引加入，也要手动observer。</span></span>
<span class="line"><span style="color:#A6ACCD;">      case &quot;splice&quot;:</span></span>
<span class="line"><span style="color:#A6ACCD;">        inserted = args.slice(2);</span></span>
<span class="line"><span style="color:#A6ACCD;">        break;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    // </span></span>
<span class="line"><span style="color:#A6ACCD;">    if (inserted) ob.observeArray(inserted);// 获取插入的值，并设置响应式监听</span></span>
<span class="line"><span style="color:#A6ACCD;">    // notify change</span></span>
<span class="line"><span style="color:#A6ACCD;">    ob.dep.notify();// 通知依赖更新</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 返回原生数组方法的执行结果</span></span>
<span class="line"><span style="color:#A6ACCD;">    return result;</span></span>
<span class="line"><span style="color:#A6ACCD;">  });</span></span>
<span class="line"><span style="color:#A6ACCD;">});</span></span></code></pre></div><p>简单来说就是，重写了数组中的那些原生方法，首先获取到这个数组的__ob__，也就是它的Observer对象，如果有新的值，就调用observeArray继续对新的值观察变化（也就是通过<code>target__proto__ == arrayMethods</code>来改变了数组实例的型），然后手动调用notify，通知渲染watcher，执行update。</p><h3 id="_21-vue-单页应用与多页应用的区别" tabindex="-1">21. Vue 单页应用与多页应用的区别 <a class="header-anchor" href="#_21-vue-单页应用与多页应用的区别" aria-label="Permalink to &quot;21. Vue 单页应用与多页应用的区别&quot;">​</a></h3><p><strong>概念：</strong></p><ul><li>SPA单页面应用（SinglePage Web Application），指只有一个主页面的应用，一开始只需要加载一次js、css等相关资源。所有内容都包含在主页面，对每一个功能模块组件化。单页应用跳转，就是切换相关组件，仅仅刷新局部资源。</li><li>MPA多页面应用 （MultiPage Application），指有多个独立页面的应用，每个页面必须重复加载js、css等相关资源。多页应用跳转，需要整页资源刷新。</li></ul><p><strong>区别：</strong></p><p><img src="https://cdn.nlark.com/yuque/0/2021/jpeg/1500604/1609521413572-54d0bd0f-8ed6-4438-997a-c890e4cd9c5e.jpeg" alt="775316ebb4c727f7c8771cc2c06e06dd.jpg"></p><h3 id="_22-vue-template-到-render-的过程" tabindex="-1">22. Vue template 到 render 的过程 <a class="header-anchor" href="#_22-vue-template-到-render-的过程" aria-label="Permalink to &quot;22. Vue template 到 render 的过程&quot;">​</a></h3><p>vue的模版编译过程主要如下：<strong>template -&gt; ast -&gt; render函数</strong></p><p>vue 在模版编译版本的码中会执行 compileToFunctions 将template转化为render函数：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// 将模板编译为render函数</span></span>
<span class="line"><span style="color:#A6ACCD;">const { render, staticRenderFns } = compileToFunctions(template,options//省略}, this)</span></span></code></pre></div><p>CompileToFunctions中的主要逻辑如下∶</p><p><strong>（1）调用parse方法将template转化为ast（抽象语法树）</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">constast = parse(template.trim(), options)</span></span></code></pre></div><ul><li><strong>parse的目标</strong>：把tamplate转换为AST树，它是一种用 JavaScript对象的形式来描述整个模板。</li><li><strong>解析过程</strong>：利用正则表达式顺序解析模板，当解析到开始标签、闭合标签、文本的时候都会分别执行对应的 回调函数，来达到构造AST树的目的。</li></ul><p>AST元素节点总共三种类型：type为1表示普通元素、2为表达式、3为纯文本</p><p><strong>（2）对静态节点做优化</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">optimize(ast,options)</span></span></code></pre></div><p>这个过程主要分析出哪些是静态节点，给其打一个标记，为后续更新渲染可以直接跳过静态节点做优化</p><p>深度遍历AST，查看每个子树的节点元素是否为静态节点或者静态节点根。如果为静态节点，他们生成的DOM永远不会改变，这对运行时模板更新起到了极大的优化作用。</p><p><strong>（3）生成代码</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">const code = generate(ast, options)</span></span></code></pre></div><p>generate将ast抽象语法树编译成 render字符串并将静态部分放到 staticRenderFns 中，最后通过 <code>new Function(\`\` render\`\`)</code> 生成render函数。</p><h3 id="_23-vue-data-中某一个属性的值发生改变后-视图会立即同步执行重新渲染吗" tabindex="-1">23. Vue data 中某一个属性的值发生改变后，视图会立即同步执行重新渲染吗？ <a class="header-anchor" href="#_23-vue-data-中某一个属性的值发生改变后-视图会立即同步执行重新渲染吗" aria-label="Permalink to &quot;23. Vue data 中某一个属性的值发生改变后，视图会立即同步执行重新渲染吗？&quot;">​</a></h3><p>不会立即同步执行重新渲染。Vue 实现响应式并不是数据发生变化之后 DOM 立即变化，而是按一定的策略进行 DOM 的更新。Vue 在更新 DOM 时是异步执行的。只要侦听到数据变化， Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。</p><p>如果同一个watcher被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。然后，在下一个的事件循环tick中，Vue 刷新队列并执行实际（已去重的）工作。</p><h3 id="_24-简述-mixin、extends-的覆盖逻辑" tabindex="-1">24. 简述 mixin、extends 的覆盖逻辑 <a class="header-anchor" href="#_24-简述-mixin、extends-的覆盖逻辑" aria-label="Permalink to &quot;24. 简述 mixin、extends 的覆盖逻辑&quot;">​</a></h3><p><strong>（1）mixin 和 extends</strong></p><p>mixin 和 extends均是用于合并、拓展组件的，两者均通过 mergeOptions 方法实现合并。</p><ul><li>mixins 接收一个混入对象的数组，其中混入对象可以像正常的实例对象一样包含实例选项，这些选项会被合并到最终的选项中。Mixin 钩子按照传入顺序依次调用，并在调用组件自身的钩子之前被调用。</li><li>extends 主要是为了便于扩展单文件组件，接收一个对象或构造函数。</li></ul><p><img src="https://cdn.nlark.com/yuque/0/2021/jpeg/1500604/1609518480272-8cb1af01-a4a8-4d54-91bb-5546aafac510.jpeg?x-oss-process=image%2Fresize%2Cw_1500" alt="bb253b1d177f421741af0e7dd0f52b5e.jpg"></p><p><strong>（2）mergeOptions 的执行过程</strong></p><ul><li>规范化选项（normalizeProps、normalizelnject、normalizeDirectives)</li><li>对未合并的选项，进行判断</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">if(!child._base) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    if(child.extends) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        parent = mergeOptions(parent, child.extends, vm)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    if(child.mixins) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        for(let i = 0, l = child.mixins.length; i &lt; l; i++){</span></span>
<span class="line"><span style="color:#A6ACCD;">            parent = mergeOptions(parent, child.mixins[i], vm)</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><ul><li>合并处理。根据一个通用 Vue 实例所包含的选项进行分类逐一判断合并，如 props、data、 methods、watch、computed、生命周期等，将合并结果存储在新定义的 options 对象里。</li><li>返回合并结果 options。</li></ul><h3 id="_25-描述下vue自定义指令" tabindex="-1">25. 描述下Vue自定义指令 <a class="header-anchor" href="#_25-描述下vue自定义指令" aria-label="Permalink to &quot;25. 描述下Vue自定义指令&quot;">​</a></h3><p>在 Vue2.0 中，代码复用和抽象的主要形式是组件。然而，有的情况下，你仍然需要对普通 DOM 元素进行底层操作，这时候就会用到自定义指令。</p><p>一般需要对DOM元素进行底层操作时使用，尽量只用来操作 DOM展示，不修改内部的值。当使用自定义指令直接修改 value 值时绑定v-model的值也不会同步更新；如必须修改可以在自定义指令中使用keydown事件，在vue组件中使用 change事件，回调中修改vue数据;</p><p><strong>（1）自定义指令基本内容</strong></p><ul><li>全局定义：<code>Vue.directive(&quot;focus&quot;,{})</code></li><li>局部定义：<code>directives:{focus:{}}</code></li><li>钩子函数：指令定义对象提供钩子函数</li></ul><p>​ o bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。</p><p>​ o inSerted：被绑定元素插入父节点时调用（仅保证父节点存在，但不一定已被插入文档中）。</p><p>​ o update：所在组件的VNode更新时调用，但是可能发生在其子VNode更新之前调用。指令的值可能发生了改变，也可能没有。但是可以通过比较更新前后的值来忽略不必要的模板更新。</p><p>​ o ComponentUpdate：指令所在组件的 VNode及其子VNode全部更新后调用。</p><p>​ o unbind：只调用一次，指令与元素解绑时调用。</p><ul><li>钩子函数参数</li></ul><p>​ o el：绑定元素</p><p>​ o bing： 指令核心对象，描述指令全部信息属性</p><p>​ o name</p><p>​ o value</p><p>​ o oldValue</p><p>​ o expression</p><p>​ o arg</p><p>​ o modifers</p><p>​ o vnode 虚拟节点</p><p>​ o oldVnode：上一个虚拟节点（更新钩子函数中才有用）</p><p><strong>（2）使用场景</strong></p><ul><li>普通DOM元素进行底层操作的时候，可以使用自定义指令</li><li>自定义指令是用来操作DOM的。尽管Vue推崇数据驱动视图的理念，但并非所有情况都适合数据驱动。自定义指令就是一种有效的补充和扩展，不仅可用于定义任何的DOM操作，并且是可复用的。</li></ul><p><strong>（3）使用案例</strong></p><p>初级应用：</p><ul><li>鼠标聚焦</li><li>下拉菜单</li><li>相对时间转换</li><li>滚动动画</li></ul><p>高级应用：</p><ul><li>自定义指令实现图片懒加载</li><li>自定义指令集成第三方插件</li></ul><h3 id="_26-子组件可以直接改变父组件的数据吗" tabindex="-1">26. 子组件可以直接改变父组件的数据吗？ <a class="header-anchor" href="#_26-子组件可以直接改变父组件的数据吗" aria-label="Permalink to &quot;26. 子组件可以直接改变父组件的数据吗？&quot;">​</a></h3><p>子组件不可以直接改变父组件的数据。这样做主要是为了维护父子组件的单向数据流。每次父级组件发生更新时，子组件中所有的 prop 都将会刷新为最新的值。如果这样做了，Vue 会在浏览器的控制台中发出警告。</p><p>Vue提倡单向数据流，即父级 props 的更新会流向子组件，但是反过来则不行。这是为了防止意外的改变父组件状态，使得应用的数据流变得难以理解，导致数据流混乱。如果破坏了单向数据流，当应用复杂时，debug 的成本会非常高。</p><p><strong>只能通过</strong> <code>**$emit**</code> <strong>派发一个自定义事件，父组件接收到后，由父组件修改。</strong></p><h3 id="_27-vue是如何收集依赖的" tabindex="-1">27. Vue是如何收集依赖的？ <a class="header-anchor" href="#_27-vue是如何收集依赖的" aria-label="Permalink to &quot;27. Vue是如何收集依赖的？&quot;">​</a></h3><p>在初始化 Vue 的每个组件时，会对组件的 data 进行初始化，就会将由普通对象变成响应式对象，在这个过程中便会进行依赖收集的相关逻辑，如下所示∶</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">function defieneReactive (obj, key, val){</span></span>
<span class="line"><span style="color:#A6ACCD;">  const dep = new Dep();</span></span>
<span class="line"><span style="color:#A6ACCD;">  ...</span></span>
<span class="line"><span style="color:#A6ACCD;">  Object.defineProperty(obj, key, {</span></span>
<span class="line"><span style="color:#A6ACCD;">    ...</span></span>
<span class="line"><span style="color:#A6ACCD;">    get: function reactiveGetter () {</span></span>
<span class="line"><span style="color:#A6ACCD;">      if(Dep.target){</span></span>
<span class="line"><span style="color:#A6ACCD;">        dep.depend();</span></span>
<span class="line"><span style="color:#A6ACCD;">        ...</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">      return val</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    ...</span></span>
<span class="line"><span style="color:#A6ACCD;">  })</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>以上只保留了关键代码，主要就是 <code>const dep = new Dep()</code>实例化一个 Dep 的实例，然后在 get 函数中通过 <code>dep.depend()</code> 进行依赖收集。</p><p><strong>（1）Dep</strong></p><p>Dep是整个依赖收集的核心，其关键代码如下：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">class Dep {</span></span>
<span class="line"><span style="color:#A6ACCD;">  static target;</span></span>
<span class="line"><span style="color:#A6ACCD;">  subs;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  constructor () {</span></span>
<span class="line"><span style="color:#A6ACCD;">    ...</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.subs = [];</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  addSub (sub) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.subs.push(sub)</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  removeSub (sub) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    remove(this.sub, sub)</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  depend () {</span></span>
<span class="line"><span style="color:#A6ACCD;">    if(Dep.target){</span></span>
<span class="line"><span style="color:#A6ACCD;">      Dep.target.addDep(this)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  notify () {</span></span>
<span class="line"><span style="color:#A6ACCD;">    const subs = this.subds.slice();</span></span>
<span class="line"><span style="color:#A6ACCD;">    for(let i = 0;i &lt; subs.length; i++){</span></span>
<span class="line"><span style="color:#A6ACCD;">      subs[i].update()</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>Dep 是一个 class ，其中有一个关 键的静态属性 static，它指向了一个全局唯一 Watcher，保证了同一时间全局只有一个 watcher 被计算，另一个属性 subs 则是一个 Watcher 的数组，所以 Dep 实际上就是对 Watcher 的管理，再看看 Watcher 的相关代码∶</p><p><strong>（2）Watcher</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">class Watcher {</span></span>
<span class="line"><span style="color:#A6ACCD;">  getter;</span></span>
<span class="line"><span style="color:#A6ACCD;">  ...</span></span>
<span class="line"><span style="color:#A6ACCD;">  constructor (vm, expression){</span></span>
<span class="line"><span style="color:#A6ACCD;">    ...</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.getter = expression;</span></span>
<span class="line"><span style="color:#A6ACCD;">    this.get();</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  get () {</span></span>
<span class="line"><span style="color:#A6ACCD;">    pushTarget(this);</span></span>
<span class="line"><span style="color:#A6ACCD;">    value = this.getter.call(vm, vm)</span></span>
<span class="line"><span style="color:#A6ACCD;">    ...</span></span>
<span class="line"><span style="color:#A6ACCD;">    return value</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  addDep (dep){</span></span>
<span class="line"><span style="color:#A6ACCD;">        ...</span></span>
<span class="line"><span style="color:#A6ACCD;">    dep.addSub(this)</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  ...</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">function pushTarget (_target) {</span></span>
<span class="line"><span style="color:#A6ACCD;">  Dep.target = _target</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>Watcher 是一个 class，它定义了一些方法，其中和依赖收集相关的主要有 get、addDep 等。</p><p><strong>（3）过程</strong></p><p>在实例化 Vue 时，依赖收集的相关过程如下∶</p><p>初 始 化 状 态 initState ， 这 中 间 便 会 通 过 defineReactive 将数据变成响应式对象，其中的 getter 部分便是用来依赖收集的。</p><p>初始化最终会走 mount 过程，其中会实例化 Watcher ，进入 Watcher 中，便会执行 this.get() 方法，</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">updateComponent = () =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  vm._update(vm._render())</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">new Watcher(vm, updateComponent)</span></span></code></pre></div><p>get 方法中的 pushTarget 实际上就是把 Dep.target 赋值为当前的 watcher。</p><p>this.getter.call（vm，vm），这里的 getter 会执行 vm._render() 方法，在这个过程中便会触发数据对象的 getter。那么每个对象值的 getter 都持有一个 dep，在触发 getter 的时候会调用 dep.depend() 方法，也就会执行 Dep.target.addDep(this)。刚才 Dep.target 已经被赋值为 watcher，于是便会执行 addDep 方法，然后走到 dep.addSub() 方法，便将当前的 watcher 订阅到这个数据持有的 dep 的 subs 中，这个目的是为后续数据变化时候能通知到哪些 subs 做准备。所以在 vm._render() 过程中，会触发所有数据的 getter，这样便已经完成了一个依赖收集的过程。</p><h3 id="_28-对-react-和-vue-的理解-它们的异同" tabindex="-1">28. 对 React 和 Vue 的理解，它们的异同 <a class="header-anchor" href="#_28-对-react-和-vue-的理解-它们的异同" aria-label="Permalink to &quot;28. 对 React 和 Vue 的理解，它们的异同&quot;">​</a></h3><p><strong>相似之处：</strong></p><ul><li>都将注意力集中保持在核心库，而将其他功能如路由和全局状态管理交给相关的库；</li><li>都有自己的构建工具，能让你得到一个根据最佳实践设置的项目模板；</li><li>都使用了Virtual DOM（虚拟DOM）提高重绘性能；</li><li>都有props的概念，允许组件间的数据传递；</li><li>都鼓励组件化应用，将应用分拆成一个个功能明确的模块，提高复用性。</li></ul><p><strong>不同之处 ：</strong></p><p><strong>1）数据流</strong></p><p>Vue默认支持数据双向绑定，而React一直提倡单向数据流</p><p><strong>2）虚拟DOM</strong></p><p>Vue2.x开始引入&quot;Virtual DOM&quot;，消除了和React在这方面的差异，但是在具体的细节还是有各自的特点。</p><ul><li>Vue宣称可以更快地计算出Virtual DOM的差异，这是由于它在渲染过程中，会跟踪每一个组件的依赖关系，不需要重新渲染整个组件树。</li><li>对于React而言，每当应用的状态被改变时，全部子组件都会重新渲染。当然，这可以通过 PureComponent/shouldComponentUpdate这个生命周期方法来进行控制，但Vue将此视为默认的优化。</li></ul><p><strong>3）组件化</strong></p><p>React与Vue最大的不同是模板的编写。</p><ul><li>Vue鼓励写近似常规HTML的模板。写起来很接近标准 HTML元素，只是多了一些属性。</li><li>React推荐你所有的模板通用JavaScript的语法扩展——JSX书写。</li></ul><p>具体来讲：React中render函数是支持闭包特性的，所以import的组件在render中可以直接调用。但是在Vue中，由于模板中使用的数据都必须挂在 this 上进行一次中转，所以 import 一个组件完了之后，还需要在 components 中再声明下。</p><p><strong>4）监听数据变化的实现原理不同</strong></p><ul><li>Vue 通过 getter/setter 以及一些函数的劫持，能精确知道数据变化，不需要特别的优化就能达到很好的性能</li><li>React 默认是通过比较引用的方式进行的，如果不优化（PureComponent/shouldComponentUpdate）可能导致大量不必要的vDOM的重新渲染。这是因为 Vue 使用的是可变数据，而React更强调数据的不可变。</li></ul><p><strong>5）高阶组件</strong></p><p>react可以通过高阶组件（HOC）来扩展，而Vue需要通过mixins来扩展。</p><p>高阶组件就是高阶函数，而React的组件本身就是纯粹的函数，所以高阶函数对React来说易如反掌。相反Vue.js使用HTML模板创建视图组件，这时模板无法有效的编译，因此Vue不能采用HOC来实现。</p><p><strong>6）构建工具</strong></p><p>两者都有自己的构建工具：</p><ul><li>React ==&gt; Create React APP</li><li>Vue ==&gt; vue-cli</li></ul><p><strong>7）跨平台</strong></p><ul><li>React ==&gt; React Native</li><li>Vue ==&gt; Weex</li></ul><h3 id="_29-vue的优点" tabindex="-1">29. Vue的优点 <a class="header-anchor" href="#_29-vue的优点" aria-label="Permalink to &quot;29. Vue的优点&quot;">​</a></h3><ul><li>轻量级框架：只关注视图层，是一个构建数据的视图集合，大小只有几十 <code>kb</code> ；</li><li>简单易学：国人开发，中文文档，不存在语言障碍 ，易于理解和学习；</li><li>双向数据绑定：保留了 <code>angular</code> 的特点，在数据操作方面更为简单；</li><li>组件化：保留了 <code>react</code> 的优点，实现了 <code>html</code> 的封装和重用，在构建单页面应用方面有着独特的优势；</li><li>视图，数据，结构分离：使数据的更改更为简单，不需要进行逻辑代码的修改，只需要操作数据就能完成相关操作；</li><li>虚拟DOM：<code>dom</code> 操作是非常耗费性能的，不再使用原生的 <code>dom</code> 操作节点，极大解放 <code>dom</code> 操作，但具体操作的还是 <code>dom</code> 不过是换了另一种方式；</li><li>运行速度更快：相比较于 <code>react</code> 而言，同样是操作虚拟 <code>dom</code>，就性能而言， <code>vue</code> 存在很大的优势。</li></ul><h3 id="_30-assets和static的区别" tabindex="-1">30. assets和static的区别 <a class="header-anchor" href="#_30-assets和static的区别" aria-label="Permalink to &quot;30. assets和static的区别&quot;">​</a></h3><p><strong>相同点：</strong> <code>assets</code> 和 <code>static</code> 两个都是存放静态资源文件。项目中所需要的资源文件图片，字体图标，样式文件等都可以放在这两个文件下，这是相同点</p><p><strong>不相同点：</strong><code>assets</code> 中存放的静态资源文件在项目打包时，也就是运行 <code>npm run build</code> 时会将 <code>assets</code> 中放置的静态资源文件进行打包上传，所谓打包简单点可以理解为压缩体积，代码格式化。而压缩后的静态资源文件最终也都会放置在 <code>static</code> 文件中跟着 <code>index.html</code> 一同上传至服务器。<code>static</code> 中放置的静态资源文件就不会要走打包压缩格式化等流程，而是直接进入打包好的目录，直接上传至服务器。因为避免了压缩直接进行上传，在打包时会提高一定的效率，但是 <code>static</code> 中的资源文件由于没有进行压缩等操作，所以文件的体积也就相对于 <code>assets</code> 中打包后的文件提交较大点。在服务器中就会占据更大的空间。</p><p><strong>建议：</strong> 将项目中 <code>template</code>需要的样式文件js文件等都可以放置在 <code>assets</code> 中，走打包这一流程。减少体积。而项目中引入的第三方的资源文件如<code>iconfoont.css</code> 等文件可以放置在 <code>static</code> 中，因为这些引入的第三方文件已经经过处理，不再需要处理，直接上传。</p><h3 id="_31-delete和vue-delete删除数组的区别" tabindex="-1">31. delete和Vue.delete删除数组的区别 <a class="header-anchor" href="#_31-delete和vue-delete删除数组的区别" aria-label="Permalink to &quot;31. delete和Vue.delete删除数组的区别&quot;">​</a></h3><ul><li><code>delete</code> 只是被删除的元素变成了 <code>empty/undefined</code> 其他的元素的键值还是不变。</li><li><code>Vue.delete</code> 直接删除了数组 改变了数组的键值。</li></ul><h3 id="_32-vue如何监听对象或者数组某个属性的变化" tabindex="-1">32. vue如何监听对象或者数组某个属性的变化 <a class="header-anchor" href="#_32-vue如何监听对象或者数组某个属性的变化" aria-label="Permalink to &quot;32. vue如何监听对象或者数组某个属性的变化&quot;">​</a></h3><p>当在项目中直接设置数组的某一项的值，或者直接设置对象的某个属性值，这个时候，你会发现页面并没有更新。这是因为Object.defineProperty()限制，监听不到变化。</p><p>解决方式：</p><ul><li>this.$set(你要改变的数组/对象，你要改变的位置/key，你要改成什么value)</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">this.$set(this.arr, 0, &quot;OBKoro1&quot;); // 改变数组</span></span>
<span class="line"><span style="color:#A6ACCD;">this.$set(this.obj, &quot;c&quot;, &quot;OBKoro1&quot;); // 改变对象</span></span></code></pre></div><ul><li>调用以下几个数组的方法</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">splice()、 push()、pop()、shift()、unshift()、sort()、reverse()</span></span></code></pre></div><p>vue源码里缓存了array的原型链，然后重写了这几个方法，触发这几个方法的时候会observer数据，意思是使用这些方法不用再进行额外的操作，视图自动进行更新。 推荐使用splice方法会比较好自定义,因为splice可以在数组的任何位置进行删除/添加操作</p><p>vm.<code>$set</code> 的实现原理是：</p><ul><li>如果目标是数组，直接使用数组的 splice 方法触发相应式；</li><li>如果目标是对象，会先判读属性是否存在、对象是否是响应式，最终如果要对属性进行响应式处理，则是通过调用 defineReactive 方法进行响应式处理（ defineReactive 方法就是 Vue 在初始化对象时，给对象属性采用 Object.defineProperty 动态添加 getter 和 setter 的功能所调用的方法）</li></ul><h3 id="_33-什么是-mixin" tabindex="-1">33. 什么是 mixin ？ <a class="header-anchor" href="#_33-什么是-mixin" aria-label="Permalink to &quot;33. 什么是 mixin ？&quot;">​</a></h3><ul><li>Mixin 使我们能够为 Vue 组件编写可插拔和可重用的功能。</li><li>如果希望在多个组件之间重用一组组件选项，例如生命周期 hook、 方法等，则可以将其编写为 mixin，并在组件中简单的引用它。</li><li>然后将 mixin 的内容合并到组件中。如果你要在 mixin 中定义生命周期 hook，那么它在执行时将优化于组件自已的 hook。</li></ul><h3 id="_34-vue模版编译原理" tabindex="-1">34. Vue模版编译原理 <a class="header-anchor" href="#_34-vue模版编译原理" aria-label="Permalink to &quot;34. Vue模版编译原理&quot;">​</a></h3><p>vue中的模板template无法被浏览器解析并渲染，因为这不属于浏览器的标准，不是正确的HTML语法，所有需要将template转化成一个JavaScript函数，这样浏览器就可以执行这一个函数并渲染出对应的HTML元素，就可以让视图跑起来了，这一个转化的过程，就成为模板编译。模板编译又分三个阶段，解析parse，优化optimize，生成generate，最终生成可执行函数render。</p><ul><li><strong>解析阶段</strong>：使用大量的正则表达式对template字符串进行解析，将标签、指令、属性等转化为抽象语法树AST。</li><li><strong>优化阶段</strong>：遍历AST，找到其中的一些静态节点并进行标记，方便在页面重渲染的时候进行diff比较时，直接跳过这一些静态节点，优化runtime的性能。</li><li><strong>生成阶段</strong>：将最终的AST转化为render函数字符串。</li></ul><h3 id="_35-对ssr的理解" tabindex="-1">35. 对SSR的理解 <a class="header-anchor" href="#_35-对ssr的理解" aria-label="Permalink to &quot;35. 对SSR的理解&quot;">​</a></h3><p>SSR也就是服务端渲染，也就是将Vue在客户端把标签渲染成HTML的工作放在服务端完成，然后再把html直接返回给客户端</p><p>SSR的优势：</p><ul><li>更好的SEO</li><li>首屏加载速度更快</li></ul><p>SSR的缺点：</p><ul><li>开发条件会受到限制，服务器端渲染只支持beforeCreate和created两个钩子；</li><li>当需要一些外部扩展库时需要特殊处理，服务端渲染应用程序也需要处于Node.js的运行环境；</li><li>更多的服务端负载。</li></ul><h3 id="_36-vue的性能优化有哪些" tabindex="-1">36. Vue的性能优化有哪些 <a class="header-anchor" href="#_36-vue的性能优化有哪些" aria-label="Permalink to &quot;36. Vue的性能优化有哪些&quot;">​</a></h3><p><strong>（1）编码阶段</strong></p><ul><li>尽量减少data中的数据，data中的数据都会增加getter和setter，会收集对应的watcher</li><li>v-if和v-for不能连用</li><li>如果需要使用v-for给每项元素绑定事件时使用事件代理</li><li>SPA 页面采用keep-alive缓存组件</li><li>在更多的情况下，使用v-if替代v-show</li><li>key保证唯一</li><li>使用路由懒加载、异步组件</li><li>防抖、节流</li><li>第三方模块按需导入</li><li>长列表滚动到可视区域动态加载</li><li>图片懒加载</li></ul><p><strong>（2）SEO优化</strong></p><ul><li>预渲染</li><li>服务端渲染SSR</li></ul><p><strong>（3）打包优化</strong></p><ul><li>压缩代码</li><li>Tree Shaking/Scope Hoisting</li><li>使用cdn加载第三方模块</li><li>多线程打包happypack</li><li>splitChunks抽离公共文件</li><li>sourceMap优化</li></ul><p><strong>（4）用户体验</strong></p><ul><li>骨架屏</li><li>PWA</li><li>还可以使用缓存(客户端缓存、服务端缓存)优化、服务端开启gzip压缩等。</li></ul><h3 id="_37-对-spa-单页面的理解-它的优缺点分别是什么" tabindex="-1">37. 对 SPA 单页面的理解，它的优缺点分别是什么？ <a class="header-anchor" href="#_37-对-spa-单页面的理解-它的优缺点分别是什么" aria-label="Permalink to &quot;37. 对 SPA 单页面的理解，它的优缺点分别是什么？&quot;">​</a></h3><p>SPA（ single-page application ）仅在 Web 页面初始化时加载相应的 HTML、JavaScript 和 CSS。一旦页面加载完成，SPA 不会因为用户的操作而进行页面的重新加载或跳转；取而代之的是利用路由机制实现 HTML 内容的变换，UI 与用户的交互，避免页面的重新加载。</p><p><strong>优点：</strong></p><ul><li>用户体验好、快，内容的改变不需要重新加载整个页面，避免了不必要的跳转和重复渲染；</li><li>基于上面一点，SPA 相对对服务器压力小；</li><li>前后端职责分离，架构清晰，前端进行交互逻辑，后端负责数据处理；</li></ul><p><strong>缺点：</strong></p><ul><li>初次加载耗时多：为实现单页 Web 应用功能及显示效果，需要在加载页面的时候将 JavaScript、CSS 统一加载，部分页面按需加载；</li><li>前进后退路由管理：由于单页应用在一个页面中显示所有的内容，所以不能使用浏览器的前进后退功能，所有的页面切换需要自己建立堆栈管理；</li><li>SEO 难度较大：由于所有的内容都在一个页面中动态替换显示，所以在 SEO 上其有着天然的弱势。</li></ul><h3 id="_38-template和jsx的有什么分别" tabindex="-1">38. template和jsx的有什么分别？ <a class="header-anchor" href="#_38-template和jsx的有什么分别" aria-label="Permalink to &quot;38. template和jsx的有什么分别？&quot;">​</a></h3><p>对于 runtime 来说，只需要保证组件存在 render 函数即可，而有了预编译之后，只需要保证构建过程中生成 render 函数就可以。在 webpack 中，使用<code>vue-loader</code>编译.vue文件，内部依赖的<code>vue-template-compiler</code>模块，在 webpack 构建过程中，将template预编译成 render 函数。与 react 类似，在添加了jsx的语法糖解析器<code>babel-plugin-transform-vue-jsx</code>之后，就可以直接手写render函数。</p><p>所以，template和jsx的都是render的一种表现形式，不同的是：JSX相对于template而言，具有更高的灵活性，在复杂的组件中，更具有优势，而 template 虽然显得有些呆滞。但是 template 在代码结构上更符合视图与逻辑分离的习惯，更简单、更直观、更好维护。</p><h3 id="_39-vue初始化页面闪动问题" tabindex="-1">39. vue初始化页面闪动问题 <a class="header-anchor" href="#_39-vue初始化页面闪动问题" aria-label="Permalink to &quot;39. vue初始化页面闪动问题&quot;">​</a></h3>`,275),y=a(`<p>首先：在css里加上以下代码：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">[v-cloak] {</span></span>
<span class="line"><span style="color:#A6ACCD;">    display: none;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>如果没有彻底解决问题，则在根元素加上<code>style=&quot;display: none;&quot; :style=&quot;{display: &#39;block&#39;}&quot;</code></p><h3 id="_40-extend-有什么作用" tabindex="-1">40. extend 有什么作用 <a class="header-anchor" href="#_40-extend-有什么作用" aria-label="Permalink to &quot;40. extend 有什么作用&quot;">​</a></h3><p>这个 API 很少用到，作用是扩展组件生成一个构造器，通常会与 <code>$mount</code> 一起使用。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// 创建组件构造器</span></span>
<span class="line"><span style="color:#A6ACCD;">let Component = Vue.extend({</span></span>
<span class="line"><span style="color:#A6ACCD;">  template: &#39;&lt;div&gt;test&lt;/div&gt;&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span>
<span class="line"><span style="color:#A6ACCD;">// 挂载到 #app 上</span></span>
<span class="line"><span style="color:#A6ACCD;">new Component().$mount(&#39;#app&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">// 除了上面的方式，还可以用来扩展已有的组件</span></span>
<span class="line"><span style="color:#A6ACCD;">let SuperComponent = Vue.extend(Component)</span></span>
<span class="line"><span style="color:#A6ACCD;">new SuperComponent({</span></span>
<span class="line"><span style="color:#A6ACCD;">    created() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        console.log(1)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span>
<span class="line"><span style="color:#A6ACCD;">new SuperComponent().$mount(&#39;#app&#39;)</span></span></code></pre></div><h3 id="_41-mixin-和-mixins-区别" tabindex="-1">41. mixin 和 mixins 区别 <a class="header-anchor" href="#_41-mixin-和-mixins-区别" aria-label="Permalink to &quot;41. mixin 和 mixins 区别&quot;">​</a></h3><p><code>mixin</code> 用于全局混入，会影响到每个组件实例，通常插件都是这样做初始化的。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">Vue.mixin({</span></span>
<span class="line"><span style="color:#A6ACCD;">    beforeCreate() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        // ...逻辑</span></span>
<span class="line"><span style="color:#A6ACCD;">        // 这种方式会影响到每个组件的 beforeCreate 钩子函数</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span></code></pre></div><p>虽然文档不建议在应用中直接使用 <code>mixin</code>，但是如果不滥用的话也是很有帮助的，比如可以全局混入封装好的 <code>ajax</code> 或者一些工具函数等等。</p><p><code>mixins</code> 应该是最常使用的扩展组件的方式了。如果多个组件中有相同的业务逻辑，就可以将这些逻辑剥离出来，通过 <code>mixins</code> 混入代码，比如上拉下拉加载数据这种逻辑等等。</p><p>另外需要注意的是 <code>mixins</code> 混入的钩子函数会先于组件内的钩子函数执行，并且在遇到同名选项的时候也会有选择性的进行合并。</p><h3 id="_42-mvvm的优缺点" tabindex="-1">42. <strong>MVVM</strong>的优缺点**?** <a class="header-anchor" href="#_42-mvvm的优缺点" aria-label="Permalink to &quot;42. **MVVM**的优缺点**?**&quot;">​</a></h3><p>优点:</p><ul><li>分离视图（View）和模型（Model），降低代码耦合，提⾼视图或者逻辑的重⽤性: ⽐如视图（View）可以独⽴于Model变化和修改，⼀个ViewModel可以绑定不同的&quot;View&quot;上，当View变化的时候Model不可以不变，当Model变化的时候View也可以不变。你可以把⼀些视图逻辑放在⼀个ViewModel⾥⾯，让很多view重⽤这段视图逻辑</li><li>提⾼可测试性: ViewModel的存在可以帮助开发者更好地编写测试代码</li><li>⾃动更新dom: 利⽤双向绑定,数据更新后视图⾃动更新,让开发者从繁琐的⼿动dom中解放</li></ul><p>缺点:</p><ul><li>Bug很难被调试: 因为使⽤双向绑定的模式，当你看到界⾯异常了，有可能是你View的代码有Bug，也可能是Model的代码有问题。数据绑定使得⼀个位置的Bug被快速传递到别的位置，要定位原始出问题的地⽅就变得不那么容易了。另外，数据绑定的声明是指令式地写在View的模版当中的，这些内容是没办法去打断点debug的</li><li>⼀个⼤的模块中model也会很⼤，虽然使⽤⽅便了也很容易保证了数据的⼀致性，当时⻓期持有，不释放内存就造成了花费更多的内存</li><li>对于⼤型的图形应⽤程序，视图状态较多，ViewModel的构建和维护的成本都会⽐较⾼。</li></ul><h3 id="_43-vue-use的实现原理" tabindex="-1">43. Vue.use的实现原理 <a class="header-anchor" href="#_43-vue-use的实现原理" aria-label="Permalink to &quot;43. Vue.use的实现原理&quot;">​</a></h3><p>先贴源码</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// src/core/global-api/use.js</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">toArray</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">../util/index</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">initUse</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">Vue</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">GlobalAPI</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">Vue</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">use</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">function</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">plugin</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">Function</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">|</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">Object</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">installedPlugins</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">_installedPlugins</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">||</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">_installedPlugins</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> []))</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">installedPlugins</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">indexOf</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">plugin</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">-</span><span style="color:#F78C6C;">1</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// additional parameters</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">args</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">toArray</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">arguments</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">args</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">unshift</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">this</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">typeof</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">plugin</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">install</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">function</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">plugin</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">install</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">apply</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">plugin</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">args</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">else</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">typeof</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">plugin</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">function</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">plugin</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">apply</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">null,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">args</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">installedPlugins</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">push</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">plugin</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>可以看到，use源码部分其实不长</p><p>Vue.use()，传入一个function或object，首先会检查这个插件是否已经存在，如果存在则直接返回</p><p>toArray方法，将类数组转化成数组，1是指从第一个参数开始，比如</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">Vue</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">use</span><span style="color:#A6ACCD;">(globalPlugin</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// args = [1,2,3]</span></span></code></pre></div><p>检查入参plugin的install属性是否为function，如果是，则通过apply调用plugin.install，此时plugin为object</p><p>如果不是，则检查入参plugin是否为function，如果是，则通过apply调用plugin</p><p>最后把入参plugin存到数组installedPlugins，用于检查插件是否存在</p><p><strong>举个栗子</strong></p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// globalPlugin.js</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 以下为我随手写的假代码，不一定能运行，但思路是对的</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> ElementUI </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">element-ui</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">app</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">useElement</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">app</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">useConfig</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">app</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">useToast</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">app</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/** 对象写法</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">export default {</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">	install(app): {</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">        useElement(app)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">        useConfig(app)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">        useToast(app)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">	}</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">}</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">*/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 注册ElementUI</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> useElement </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">app</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">use</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">ElementUI</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 注册全局配置</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> useConfig </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">app</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">config</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">name</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">xxx</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">config</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">age</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">18</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 注册自己写的toast方法</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> useToast </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">app</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">$toast</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// 自己写的toast方法</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// main.js</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> Vue </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> globalPlugin </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./globalPlugin</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">// 就是上面这个js</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> vm </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Vue</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">vm</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">use</span><span style="color:#A6ACCD;">(globalPlugin)	</span><span style="color:#676E95;font-style:italic;">// 执行自定义插件</span></span></code></pre></div><p>根据以上demo，可以得出，通过use</p><ul><li>注册全局配置属性</li><li>注册全局引用方法</li></ul><h2 id="二、生命周期" tabindex="-1">二、生命周期 <a class="header-anchor" href="#二、生命周期" aria-label="Permalink to &quot;二、生命周期&quot;">​</a></h2><h3 id="_1-说一下vue的生命周期" tabindex="-1">1. 说一下Vue的生命周期 <a class="header-anchor" href="#_1-说一下vue的生命周期" aria-label="Permalink to &quot;1. 说一下Vue的生命周期&quot;">​</a></h3><p>Vue 实例有⼀个完整的⽣命周期，也就是从开始创建、初始化数据、编译模版、挂载Dom -&gt; 渲染、更新 -&gt; 渲染、卸载 等⼀系列过程，称这是Vue的⽣命周期。</p><ol><li><strong>beforeCreate（创建前）</strong>：数据观测和初始化事件还未开始，此时 data 的响应式追踪、event/watcher 都还没有被设置，也就是说不能访问到data、computed、watch、methods上的方法和数据。</li><li><strong>created</strong>**（创建后）** ：实例创建完成，实例上配置的 options 包括 data、computed、watch、methods 等都配置完成，但是此时渲染得节点还未挂载到 DOM，所以不能访问到 <code>$el</code> 属性。</li><li><strong>beforeMount（挂载前）</strong>：在挂载开始之前被调用，相关的render函数首次被调用。实例已完成以下的配置：编译模板，把data里面的数据和模板生成html。此时还没有挂载html到页面上。</li><li><strong>mounted（挂载后）</strong>：在el被新创建的 vm.$el 替换，并挂载到实例上去之后调用。实例已完成以下的配置：用上面编译好的html内容替换el属性指向的DOM对象。完成模板中的html渲染到html 页面中。此过程中进行ajax交互。</li><li><strong>beforeUpdate（更新前）</strong>：响应式数据更新时调用，此时虽然响应式数据更新了，但是对应的真实 DOM 还没有被渲染。</li><li><strong>updated（更新后）</strong> ：在由于数据更改导致的虚拟DOM重新渲染和打补丁之后调用。此时 DOM 已经根据响应式数据的变化更新了。调用时，组件 DOM已经更新，所以可以执行依赖于DOM的操作。然而在大多数情况下，应该避免在此期间更改状态，因为这可能会导致更新无限循环。该钩子在服务器端渲染期间不被调用。</li><li><strong>beforeDestroy（销毁前）</strong>：实例销毁之前调用。这一步，实例仍然完全可用，<code>this</code> 仍能获取到实例。</li><li><strong>destroyed（销毁后）</strong>：实例销毁后调用，调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。该钩子在服务端渲染期间不被调用。</li></ol><p>另外还有 <code>keep-alive</code> 独有的生命周期，分别为 <code>activated</code> 和 <code>deactivated</code> 。用 <code>keep-alive</code> 包裹的组件在切换时不会进行销毁，而是缓存到内存中并执行 <code>deactivated</code> 钩子函数，命中缓存渲染后会执行 <code>activated</code> 钩子函数。</p><h3 id="_2-vue-子组件和父组件执行顺序" tabindex="-1">2. Vue 子组件和父组件执行顺序 <a class="header-anchor" href="#_2-vue-子组件和父组件执行顺序" aria-label="Permalink to &quot;2. Vue 子组件和父组件执行顺序&quot;">​</a></h3><p><strong>加载渲染过程：</strong></p><p>1.父组件 beforeCreate</p><p>2.父组件 created</p><p>3.父组件 beforeMount</p><p>4.子组件 beforeCreate</p><p>5.子组件 created</p><p>6.子组件 beforeMount</p><p>7.子组件 mounted</p><p>8.父组件 mounted</p><p><strong>更新过程：</strong></p><p>\\1. 父组件 beforeUpdate</p><p>2.子组件 beforeUpdate</p><p>3.子组件 updated</p><p>4.父组件 updated</p><p><strong>销毁过程：</strong></p><p>\\1. 父组件 beforeDestroy</p><p>2.子组件 beforeDestroy</p><p>3.子组件 destroyed</p><p>4.父组件 destoryed</p><h3 id="_3-created和mounted的区别" tabindex="-1">3. created和mounted的区别 <a class="header-anchor" href="#_3-created和mounted的区别" aria-label="Permalink to &quot;3. created和mounted的区别&quot;">​</a></h3><ul><li>created:在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。</li><li>mounted:在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。</li></ul><h3 id="_4-一般在哪个生命周期请求异步数据" tabindex="-1">4. 一般在哪个生命周期请求异步数据 <a class="header-anchor" href="#_4-一般在哪个生命周期请求异步数据" aria-label="Permalink to &quot;4. 一般在哪个生命周期请求异步数据&quot;">​</a></h3><p>我们可以在钩子函数 created、beforeMount、mounted 中进行调用，因为在这三个钩子函数中，data 已经创建，可以将服务端端返回的数据进行赋值。</p><p>推荐在 created 钩子函数中调用异步请求，因为在 created 钩子函数中调用异步请求有以下优点：</p><ul><li>能更快获取到服务端数据，减少页面加载时间，用户体验更好；</li><li>SSR不支持 beforeMount 、mounted 钩子函数，放在 created 中有助于一致性。</li></ul><h3 id="_5-keep-alive-中的生命周期哪些" tabindex="-1">5. keep-alive 中的生命周期哪些 <a class="header-anchor" href="#_5-keep-alive-中的生命周期哪些" aria-label="Permalink to &quot;5. keep-alive 中的生命周期哪些&quot;">​</a></h3><p>keep-alive是 Vue 提供的一个内置组件，用来对组件进行缓存——在组件切换过程中将状态保留在内存中，防止重复渲染DOM。</p><p>如果为一个组件包裹了 keep-alive，那么它会多出两个生命周期：deactivated、activated。同时，beforeDestroy 和 destroyed 就不会再被触发了，因为组件不会被真正销毁。</p><p>当组件被换掉时，会被缓存到内存中、触发 deactivated 生命周期；当组件被切回来时，再去缓存里找这个组件、触发 activated钩子函数。</p><h2 id="三、组件通信" tabindex="-1">三、组件通信 <a class="header-anchor" href="#三、组件通信" aria-label="Permalink to &quot;三、组件通信&quot;">​</a></h2><p>组件通信的方式如下：</p><h3 id="_1-props-emit" tabindex="-1">（1） props / $emit <a class="header-anchor" href="#_1-props-emit" aria-label="Permalink to &quot;（1） props  /  $emit&quot;">​</a></h3><p>父组件通过<code>props</code>向子组件传递数据，子组件通过<code>$emit</code>和父组件通信</p><h5 id="_1-父组件向子组件传值" tabindex="-1">1. 父组件向子组件传值 <a class="header-anchor" href="#_1-父组件向子组件传值" aria-label="Permalink to &quot;1. 父组件向子组件传值&quot;">​</a></h5><ul><li><code>props</code>只能是父组件向子组件进行传值，<code>props</code>使得父子组件之间形成了一个单向下行绑定。子组件的数据会随着父组件不断更新。</li><li><code>props</code> 可以显示定义一个或一个以上的数据，对于接收的数据，可以是各种数据类型，同样也可以传递一个函数。</li><li><code>props</code>属性名规则：若在<code>props</code>中使用驼峰形式，模板中需要使用短横线的形式</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// 父组件</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div id=&quot;father&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;son :msg=&quot;msgData&quot; :fn=&quot;myFunction&quot;&gt;&lt;/son&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">import son from &quot;./son.vue&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">export default {</span></span>
<span class="line"><span style="color:#A6ACCD;">    name: father,</span></span>
<span class="line"><span style="color:#A6ACCD;">    data() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        msgData: &quot;父组件数据&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">    },</span></span>
<span class="line"><span style="color:#A6ACCD;">    methods: {</span></span>
<span class="line"><span style="color:#A6ACCD;">        myFunction() {</span></span>
<span class="line"><span style="color:#A6ACCD;">            console.log(&quot;vue&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">    },</span></span>
<span class="line"><span style="color:#A6ACCD;">    components: {</span></span>
<span class="line"><span style="color:#A6ACCD;">        son</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// 子组件</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div id=&quot;son&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;p&gt;{{msg}}&lt;/p&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;button @click=&quot;fn&quot;&gt;按钮&lt;/button&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">export default {</span></span>
<span class="line"><span style="color:#A6ACCD;">    name: &quot;son&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    props: [&quot;msg&quot;, &quot;fn&quot;]</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span></code></pre></div><h5 id="_2-子组件向父组件传值" tabindex="-1">2. 子组件向父组件传值 <a class="header-anchor" href="#_2-子组件向父组件传值" aria-label="Permalink to &quot;2. 子组件向父组件传值&quot;">​</a></h5><ul><li><code>$emit</code>绑定一个自定义事件，当这个事件被执行的时就会将参数传递给父组件，而父组件通过<code>v-on</code>监听并接收参数。</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// 父组件</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;div class=&quot;section&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;com-article :articles=&quot;articleList&quot; @onEmitIndex=&quot;onEmitIndex&quot;&gt;&lt;/com-article&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;p&gt;{{currentIndex}}&lt;/p&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">import comArticle from &#39;./test/article.vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">export default {</span></span>
<span class="line"><span style="color:#A6ACCD;">  name: &#39;comArticle&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  components: { comArticle },</span></span>
<span class="line"><span style="color:#A6ACCD;">  data() {</span></span>
<span class="line"><span style="color:#A6ACCD;">    return {</span></span>
<span class="line"><span style="color:#A6ACCD;">      currentIndex: -1,</span></span>
<span class="line"><span style="color:#A6ACCD;">      articleList: [&#39;红楼梦&#39;, &#39;西游记&#39;, &#39;三国演义&#39;]</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  methods: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    onEmitIndex(idx) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      this.currentIndex = idx</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// 父组件</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;div class=&quot;section&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;com-article :articles=&quot;articleList&quot; @onEmitIndex=&quot;onEmitIndex&quot;&gt;&lt;/com-article&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;p&gt;{{currentIndex}}&lt;/p&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">import comArticle from &#39;./test/article.vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">export default {</span></span>
<span class="line"><span style="color:#A6ACCD;">  name: &#39;comArticle&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  components: { comArticle },</span></span>
<span class="line"><span style="color:#A6ACCD;">  data() {</span></span>
<span class="line"><span style="color:#A6ACCD;">    return {</span></span>
<span class="line"><span style="color:#A6ACCD;">      currentIndex: -1,</span></span>
<span class="line"><span style="color:#A6ACCD;">      articleList: [&#39;红楼梦&#39;, &#39;西游记&#39;, &#39;三国演义&#39;]</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  methods: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    onEmitIndex(idx) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      this.currentIndex = idx</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">//子组件</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div v-for=&quot;(item, index) in articles&quot; :key=&quot;index&quot; @click=&quot;emitIndex(index)&quot;&gt;{{item}}&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">export default {</span></span>
<span class="line"><span style="color:#A6ACCD;">  props: [&#39;articles&#39;],</span></span>
<span class="line"><span style="color:#A6ACCD;">  methods: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    emitIndex(index) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      this.$emit(&#39;onEmitIndex&#39;, index) // 触发父组件的方法，并传递参数index</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span></code></pre></div><h3 id="_2-eventbus事件总线-emit-on" tabindex="-1">（2）eventBus事件总线（$emit / $on） <a class="header-anchor" href="#_2-eventbus事件总线-emit-on" aria-label="Permalink to &quot;（2）eventBus事件总线（$emit / $on）&quot;">​</a></h3><p><code>eventBus</code>事件总线适用于<strong>父子组件</strong>、<strong>非父子组件</strong>等之间的通信，使用步骤如下：</p><p><strong>（1）创建事件中心管理组件之间的通信</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// event-bus.js</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">import Vue from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">export const EventBus = new Vue()</span></span></code></pre></div><p><strong>（2）发送事件</strong></p><p>假设有两个兄弟组件<code>firstCom</code>和<code>secondCom</code>：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;first-com&gt;&lt;/first-com&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;second-com&gt;&lt;/second-com&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">import firstCom from &#39;./firstCom.vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">import secondCom from &#39;./secondCom.vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">export default {</span></span>
<span class="line"><span style="color:#A6ACCD;">  components: { firstCom, secondCom }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span></code></pre></div><p>在<code>firstCom</code>组件中发送事件：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;button @click=&quot;add&quot;&gt;加法&lt;/button&gt;    </span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">import {EventBus} from &#39;./event-bus.js&#39; // 引入事件中心</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">export default {</span></span>
<span class="line"><span style="color:#A6ACCD;">  data(){</span></span>
<span class="line"><span style="color:#A6ACCD;">    return{</span></span>
<span class="line"><span style="color:#A6ACCD;">      num:0</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  methods:{</span></span>
<span class="line"><span style="color:#A6ACCD;">    add(){</span></span>
<span class="line"><span style="color:#A6ACCD;">      EventBus.$emit(&#39;addition&#39;, {</span></span>
<span class="line"><span style="color:#A6ACCD;">        num:this.num++</span></span>
<span class="line"><span style="color:#A6ACCD;">      })</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span></code></pre></div><p><strong>（3）接收事件</strong></p><p>在<code>secondCom</code>组件中发送事件：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;div&gt;求和: {{count}}&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">import { EventBus } from &#39;./event-bus.js&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">export default {</span></span>
<span class="line"><span style="color:#A6ACCD;">  data() {</span></span>
<span class="line"><span style="color:#A6ACCD;">    return {</span></span>
<span class="line"><span style="color:#A6ACCD;">      count: 0</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  mounted() {</span></span>
<span class="line"><span style="color:#A6ACCD;">    EventBus.$on(&#39;addition&#39;, param =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">      this.count = this.count + param.num;</span></span>
<span class="line"><span style="color:#A6ACCD;">    })</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span></code></pre></div><p>在上述代码中，这就相当于将<code>num</code>值存贮在了事件总线中，在其他组件中可以直接访问。事件总线就相当于一个桥梁，不同组件通过它来通信。</p><p>虽然看起来比较简单，但是这种方法也有不便之处，如果项目过大，使用这种方式进行通信，后期维护起来会很困难。</p><h3 id="_3-依赖注入-provide-inject" tabindex="-1">（3）依赖注入（provide / inject） <a class="header-anchor" href="#_3-依赖注入-provide-inject" aria-label="Permalink to &quot;（3）依赖注入（provide / inject）&quot;">​</a></h3><p>这种方式就是Vue中的<strong>依赖注入</strong>，该方法用于<strong>父子组件之间的通信</strong>。当然这里所说的父子不一定是真正的父子，也可以是祖孙组件，在层数很深的情况下，可以使用这种方法来进行传值。就不用一层一层的传递了。</p><p><code>provide / inject</code>是Vue提供的两个钩子，和<code>data</code>、<code>methods</code>是同级的。并且<code>provide</code>的书写形式和<code>data</code>一样。</p><ul><li><code>provide</code> 钩子用来发送数据或方法</li><li><code>inject</code>钩子用来接收数据或方法</li></ul><p>在父组件中：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">provide() {</span></span>
<span class="line"><span style="color:#A6ACCD;"> return {</span></span>
<span class="line"><span style="color:#A6ACCD;">    num: this.num</span></span>
<span class="line"><span style="color:#A6ACCD;">  };</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>在子组件中：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">inject: [&#39;num&#39;]</span></span></code></pre></div><p>还可以这样写，这样写就可以访问父组件中的所有属性：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">provide() {</span></span>
<span class="line"><span style="color:#A6ACCD;"> return {</span></span>
<span class="line"><span style="color:#A6ACCD;">    app: this</span></span>
<span class="line"><span style="color:#A6ACCD;">  };</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">data() {</span></span>
<span class="line"><span style="color:#A6ACCD;"> return {</span></span>
<span class="line"><span style="color:#A6ACCD;">    num: 1</span></span>
<span class="line"><span style="color:#A6ACCD;">  };</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">inject: [&#39;app&#39;]</span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(this.app.num)</span></span></code></pre></div><p><strong>注意：</strong> 依赖注入所提供的属性是<strong>非响应式</strong>的。</p><h3 id="_3-ref-refs" tabindex="-1">（3）ref / $refs <a class="header-anchor" href="#_3-ref-refs" aria-label="Permalink to &quot;（3）ref / $refs&quot;">​</a></h3><p>这种方式也是实现<strong>父子组件</strong>之间的通信。</p><p><code>ref</code>： 这个属性用在子组件上，它的引用就指向了子组件的实例。可以通过实例来访问组件的数据和方法。</p><p>在子组件中：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">export default {</span></span>
<span class="line"><span style="color:#A6ACCD;">  data () {</span></span>
<span class="line"><span style="color:#A6ACCD;">    return {</span></span>
<span class="line"><span style="color:#A6ACCD;">      name: &#39;JavaScript&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  methods: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    sayHello () {</span></span>
<span class="line"><span style="color:#A6ACCD;">      console.log(&#39;hello&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>在父组件中：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;child ref=&quot;child&quot;&gt;&lt;/component-a&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  import child from &#39;./child.vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">  export default {</span></span>
<span class="line"><span style="color:#A6ACCD;">    components: { child },</span></span>
<span class="line"><span style="color:#A6ACCD;">    mounted () {</span></span>
<span class="line"><span style="color:#A6ACCD;">      console.log(this.$refs.child.name);  // JavaScript</span></span>
<span class="line"><span style="color:#A6ACCD;">      this.$refs.child.sayHello();  // hello</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span></code></pre></div><h3 id="_4-parent-children" tabindex="-1">（4）$parent / $children <a class="header-anchor" href="#_4-parent-children" aria-label="Permalink to &quot;（4）$parent / $children&quot;">​</a></h3><ul><li>使用<code>$parent</code>可以让组件访问父组件的实例（访问的是上一级父组件的属性和方法）</li><li>使用<code>$children</code>可以让组件访问子组件的实例，但是，<code>$children</code>并不能保证顺序，并且访问的数据也不是响应式的。</li></ul><p>在子组件中：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;span&gt;{{message}}&lt;/span&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;p&gt;获取父组件的值为:  {{parentVal}}&lt;/p&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">export default {</span></span>
<span class="line"><span style="color:#A6ACCD;">  data() {</span></span>
<span class="line"><span style="color:#A6ACCD;">    return {</span></span>
<span class="line"><span style="color:#A6ACCD;">      message: &#39;Vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  computed:{</span></span>
<span class="line"><span style="color:#A6ACCD;">    parentVal(){</span></span>
<span class="line"><span style="color:#A6ACCD;">      return this.$parent.msg;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span></code></pre></div><p>在父组件中：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// 父组件中</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;div class=&quot;hello_world&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div&gt;{{msg}}&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;child&gt;&lt;/child&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;button @click=&quot;change&quot;&gt;点击改变子组件值&lt;/button&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">import child from &#39;./child.vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">export default {</span></span>
<span class="line"><span style="color:#A6ACCD;">  components: { child },</span></span>
<span class="line"><span style="color:#A6ACCD;">  data() {</span></span>
<span class="line"><span style="color:#A6ACCD;">    return {</span></span>
<span class="line"><span style="color:#A6ACCD;">      msg: &#39;Welcome&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  methods: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    change() {</span></span>
<span class="line"><span style="color:#A6ACCD;">      // 获取到子组件</span></span>
<span class="line"><span style="color:#A6ACCD;">      this.$children[0].message = &#39;JavaScript&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span></code></pre></div><p>在上面的代码中，子组件获取到了父组件的<code>parentVal</code>值，父组件改变了子组件中<code>message</code>的值。</p><p><strong>需要注意：</strong></p><ul><li>通过<code>$parent</code>访问到的是上一级父组件的实例，可以使用<code>$root</code>来访问根组件的实例</li><li>在组件中使用<code>$children</code>拿到的是所有的子组件的实例，它是一个数组，并且是无序的</li><li>在根组件<code>#app</code>上拿<code>$parent</code>得到的是<code>new Vue()</code>的实例，在这实例上再拿<code>$parent</code>得到的是<code>undefined</code>，而在最底层的子组件拿<code>$children</code>是个空数组</li><li><code>$children</code> 的值是<strong>数组</strong>，而<code>$parent</code>是个<strong>对象</strong></li></ul><h3 id="_5-attrs-listeners" tabindex="-1">（5）$attrs / $listeners <a class="header-anchor" href="#_5-attrs-listeners" aria-label="Permalink to &quot;（5）$attrs / $listeners&quot;">​</a></h3><p>考虑一种场景，如果A是B组件的父组件，B是C组件的父组件。如果想要组件A给组件C传递数据，这种隔代的数据，该使用哪种方式呢？</p><p>如果是用<code>props/$emit</code>来一级一级的传递，确实可以完成，但是比较复杂；如果使用事件总线，在多人开发或者项目较大的时候，维护起来很麻烦；如果使用Vuex，的确也可以，但是如果仅仅是传递数据，那可能就有点浪费了。</p><p>针对上述情况，Vue引入了<code>$attrs / $listeners</code>，实现组件之间的跨代通信。</p><p>先来看一下<code>inheritAttrs</code>，它的默认值true，继承所有的父组件属性除<code>props</code>之外的所有属性；<code>inheritAttrs：false</code> 只继承class属性 。</p><ul><li><code>$attrs</code>：继承所有的父组件属性（除了prop传递的属性、class 和 style ），一般用在子组件的子元素上</li><li><code>$listeners</code>：该属性是一个对象，里面包含了作用在这个组件上的所有监听器，可以配合 <code>v-on=&quot;$listeners&quot;</code> 将所有的事件监听器指向这个组件的某个特定的子元素。（相当于子组件继承父组件的事件）</li></ul><p>A组件（<code>APP.vue</code>）：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div id=&quot;app&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        //此处监听了两个事件，可以在B组件或者C组件中直接触发 </span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;child1 :p-child1=&quot;child1&quot; :p-child2=&quot;child2&quot; @test1=&quot;onTest1&quot; @test2=&quot;onTest2&quot;&gt;&lt;/child1&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">import Child1 from &#39;./Child1.vue&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;">export default {</span></span>
<span class="line"><span style="color:#A6ACCD;">    components: { Child1 },</span></span>
<span class="line"><span style="color:#A6ACCD;">    methods: {</span></span>
<span class="line"><span style="color:#A6ACCD;">        onTest1() {</span></span>
<span class="line"><span style="color:#A6ACCD;">            console.log(&#39;test1 running&#39;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        },</span></span>
<span class="line"><span style="color:#A6ACCD;">        onTest2() {</span></span>
<span class="line"><span style="color:#A6ACCD;">            console.log(&#39;test2 running&#39;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span></code></pre></div><p>B组件（<code>Child1.vue</code>）：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div class=&quot;child-1&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;p&gt;props: {{pChild1}}&lt;/p&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;p&gt;$attrs: {{$attrs}}&lt;/p&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;child2 v-bind=&quot;$attrs&quot; v-on=&quot;$listeners&quot;&gt;&lt;/child2&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">import Child2 from &#39;./Child2.vue&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;">export default {</span></span>
<span class="line"><span style="color:#A6ACCD;">    props: [&#39;pChild1&#39;],</span></span>
<span class="line"><span style="color:#A6ACCD;">    components: { Child2 },</span></span>
<span class="line"><span style="color:#A6ACCD;">    inheritAttrs: false,</span></span>
<span class="line"><span style="color:#A6ACCD;">    mounted() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.$emit(&#39;test1&#39;); // 触发APP.vue中的test1方法</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span></code></pre></div><p>C 组件 (<code>Child2.vue</code>)：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div class=&quot;child-2&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;p&gt;props: {{pChild2}}&lt;/p&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;p&gt;$attrs: {{$attrs}}&lt;/p&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">export default {</span></span>
<span class="line"><span style="color:#A6ACCD;">    props: [&#39;pChild2&#39;],</span></span>
<span class="line"><span style="color:#A6ACCD;">    inheritAttrs: false,</span></span>
<span class="line"><span style="color:#A6ACCD;">    mounted() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.$emit(&#39;test2&#39;);// 触发APP.vue中的test2方法</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span></code></pre></div><p>在上述代码中：</p><ul><li>C组件中能直接触发test的原因在于 B组件调用C组件时 使用 v-on 绑定了<code>$listeners</code> 属性</li><li>在B组件中通过v-bind 绑定<code>$attrs</code>属性，C组件可以直接获取到A组件中传递下来的props（除了B组件中props声明的）</li></ul><h3 id="_6-总结" tabindex="-1">（6）总结 <a class="header-anchor" href="#_6-总结" aria-label="Permalink to &quot;（6）总结&quot;">​</a></h3><p><strong>（1）父子组件间通信</strong></p><ul><li>子组件通过 props 属性来接受父组件的数据，然后父组件在子组件上注册监听事件，子组件通过 emit 触发事件来向父组件发送数据。</li><li>通过 ref 属性给子组件设置一个名字。父组件通过 $refs 组件名来获得子组件，子组件通过 $parent 获得父组件，这样也可以实现通信。</li><li>使用 provide/inject，在父组件中通过 provide提供变量，在子组件中通过 inject 来将变量注入到组件中。不论子组件有多深，只要调用了 inject 那么就可以注入 provide中的数据。</li></ul><p><strong>（2）兄弟组件间通信</strong></p><ul><li>使用 eventBus 的方法，它的本质是通过创建一个空的 Vue 实例来作为消息传递的对象，通信的组件引入这个实例，通信的组件通过在这个实例上监听和触发事件，来实现消息的传递。</li><li>通过 $parent/$refs 来获取到兄弟组件，也可以进行通信。</li></ul><p><strong>（3）任意组件之间</strong></p><ul><li>使用 eventBus ，其实就是创建一个事件中心，相当于中转站，可以用它来传递事件和接收事件。</li></ul><p>如果业务逻辑复杂，很多组件之间需要同时处理一些公共的数据，这个时候采用上面这一些方法可能不利于项目的维护。这个时候可以使用 vuex ，vuex 的思想就是将这一些公共的数据抽离出来，将它作为一个全局的变量来管理，然后其他组件就可以对这个公共数据进行读写操作，这样达到了解耦的目的。</p><h2 id="四、路由" tabindex="-1">四、路由 <a class="header-anchor" href="#四、路由" aria-label="Permalink to &quot;四、路由&quot;">​</a></h2><h3 id="_1-vue-router-的懒加载如何实现" tabindex="-1">1. Vue-Router 的懒加载如何实现 <a class="header-anchor" href="#_1-vue-router-的懒加载如何实现" aria-label="Permalink to &quot;1. Vue-Router 的懒加载如何实现&quot;">​</a></h3><p>非懒加载：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">import List from &#39;@/components/list.vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">const router = new VueRouter({</span></span>
<span class="line"><span style="color:#A6ACCD;">  routes: [</span></span>
<span class="line"><span style="color:#A6ACCD;">    { path: &#39;/list&#39;, component: List }</span></span>
<span class="line"><span style="color:#A6ACCD;">  ]</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span></code></pre></div><p>（1）方案一(常用)：使用箭头函数+import动态加载</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">const List = () =&gt; import(&#39;@/components/list.vue&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">const router = new VueRouter({</span></span>
<span class="line"><span style="color:#A6ACCD;">  routes: [</span></span>
<span class="line"><span style="color:#A6ACCD;">    { path: &#39;/list&#39;, component: List }</span></span>
<span class="line"><span style="color:#A6ACCD;">  ]</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span></code></pre></div><p>（2）方案二：使用箭头函数+require动态加载</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">const router = new Router({</span></span>
<span class="line"><span style="color:#A6ACCD;">  routes: [</span></span>
<span class="line"><span style="color:#A6ACCD;">   {</span></span>
<span class="line"><span style="color:#A6ACCD;">     path: &#39;/list&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">     component: resolve =&gt; require([&#39;@/components/list&#39;], resolve)</span></span>
<span class="line"><span style="color:#A6ACCD;">   }</span></span>
<span class="line"><span style="color:#A6ACCD;">  ]</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span></code></pre></div><p>（3）方案三：使用webpack的require.ensure技术，也可以实现按需加载。 这种情况下，多个路由指定相同的chunkName，会合并打包成一个js文件。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// r就是resolve</span></span>
<span class="line"><span style="color:#A6ACCD;">const List = r =&gt; require.ensure([], () =&gt; r(require(&#39;@/components/list&#39;)), &#39;list&#39;);</span></span>
<span class="line"><span style="color:#A6ACCD;">// 路由也是正常的写法  这种是官方推荐的写的 按模块划分懒加载 </span></span>
<span class="line"><span style="color:#A6ACCD;">const router = new Router({</span></span>
<span class="line"><span style="color:#A6ACCD;">  routes: [</span></span>
<span class="line"><span style="color:#A6ACCD;">  {</span></span>
<span class="line"><span style="color:#A6ACCD;">    path: &#39;/list&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    component: List,</span></span>
<span class="line"><span style="color:#A6ACCD;">    name: &#39;list&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;"> ]</span></span>
<span class="line"><span style="color:#A6ACCD;">}))</span></span></code></pre></div><h3 id="_2-路由的hash和history模式的区别" tabindex="-1">2. 路由的hash和history模式的区别 <a class="header-anchor" href="#_2-路由的hash和history模式的区别" aria-label="Permalink to &quot;2. 路由的hash和history模式的区别&quot;">​</a></h3><p>Vue-Router有两种模式：<strong>hash模式</strong>和<strong>history模式</strong>。默认的路由模式是hash模式。</p><h4 id="_1-hash模式" tabindex="-1">1. hash模式 <a class="header-anchor" href="#_1-hash模式" aria-label="Permalink to &quot;1. hash模式&quot;">​</a></h4><p><strong>简介：</strong> hash模式是开发中默认的模式，它的URL带着一个#，例如：<a href="http://www.abc.com/#/vue%EF%BC%8C%E5%AE%83%E7%9A%84hash%E5%80%BC%E5%B0%B1%E6%98%AF%60#/vue%60%E3%80%82" target="_blank" rel="noreferrer">http://www.abc.com/#/vue，它的hash值就是\`#/vue\`。</a></p><p><strong>特点</strong>：hash值会出现在URL里面，但是不会出现在HTTP请求中，对后端完全没有影响。所以改变hash值，不会重新加载页面。这种模式的浏览器支持度很好，低版本的IE浏览器也支持这种模式。hash路由被称为是前端路由，已经成为SPA（单页面应用）的标配。</p><p><strong>原理：</strong> hash模式的主要原理就是<strong>onhashchange()事件</strong>：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">window.onhashchange = function(event){</span></span>
<span class="line"><span style="color:#A6ACCD;">    console.log(event.oldURL, event.newURL);</span></span>
<span class="line"><span style="color:#A6ACCD;">    let hash = location.hash.slice(1);</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>使用onhashchange()事件的好处就是，在页面的hash值发生变化时，无需向后端发起请求，window就可以监听事件的改变，并按规则加载相应的代码。除此之外，hash值变化对应的URL都会被浏览器记录下来，这样浏览器就能实现页面的前进和后退。虽然是没有请求后端服务器，但是页面的hash值和对应的URL关联起来了。</p><h4 id="_2-history模式" tabindex="-1">2. history模式 <a class="header-anchor" href="#_2-history模式" aria-label="Permalink to &quot;2. history模式&quot;">​</a></h4><p><strong>简介：</strong> history模式的URL中没有#，它使用的是传统的路由分发模式，即用户在输入一个URL时，服务器会接收这个请求，并解析这个URL，然后做出相应的逻辑处理。</p><p><strong>特点：</strong> 当使用history模式时，URL就像这样：<a href="http://abc.com/user/id%E3%80%82%E7%9B%B8%E6%AF%94hash%E6%A8%A1%E5%BC%8F%E6%9B%B4%E5%8A%A0%E5%A5%BD%E7%9C%8B%E3%80%82%E4%BD%86%E6%98%AF%EF%BC%8Chistory%E6%A8%A1%E5%BC%8F%E9%9C%80%E8%A6%81%E5%90%8E%E5%8F%B0%E9%85%8D%E7%BD%AE%E6%94%AF%E6%8C%81%E3%80%82%E5%A6%82%E6%9E%9C%E5%90%8E%E5%8F%B0%E6%B2%A1%E6%9C%89%E6%AD%A3%E7%A1%AE%E9%85%8D%E7%BD%AE%EF%BC%8C%E8%AE%BF%E9%97%AE%E6%97%B6%E4%BC%9A%E8%BF%94%E5%9B%9E404%E3%80%82" target="_blank" rel="noreferrer">http://abc.com/user/id。相比hash模式更加好看。但是，history模式需要后台配置支持。如果后台没有正确配置，访问时会返回404。</a></p><p><strong>API：</strong> history api可以分为两大部分，切换历史状态和修改历史状态：</p><ul><li><strong>修改历史状态</strong>：包括了 HTML5 History Interface 中新增的 <code>pushState()</code> 和 <code>replaceState()</code> 方法，这两个方法应用于浏览器的历史记录栈，提供了对历史记录进行修改的功能。只是当他们进行修改时，虽然修改了url，但浏览器不会立即向后端发送请求。如果要做到改变url但又不刷新页面的效果，就需要前端用上这两个API。</li><li><strong>切换历史状态：</strong> 包括<code>forward()</code>、<code>back()</code>、<code>go()</code>三个方法，对应浏览器的前进，后退，跳转操作。</li></ul><p>虽然history模式丢弃了丑陋的#。但是，它也有自己的缺点，就是在刷新页面的时候，如果没有相应的路由或资源，就会刷出404来。</p><p>如果想要切换到history模式，就要进行以下配置（后端也要进行配置）：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">const router = new VueRouter({</span></span>
<span class="line"><span style="color:#A6ACCD;">  mode: &#39;history&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  routes: [...]</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span></code></pre></div><h4 id="_3-两种模式对比" tabindex="-1">3. 两种模式对比 <a class="header-anchor" href="#_3-两种模式对比" aria-label="Permalink to &quot;3. 两种模式对比&quot;">​</a></h4><p>调用 history.pushState() 相比于直接修改 hash，存在以下优势:</p><ul><li>pushState() 设置的新 URL 可以是与当前 URL 同源的任意 URL；而 hash 只可修改 # 后面的部分，因此只能设置与当前 URL 同文档的 URL；</li><li>pushState() 设置的新 URL 可以与当前 URL 一模一样，这样也会把记录添加到栈中；而 hash 设置的新值必须与原来不一样才会触发动作将记录添加到栈中；</li><li>pushState() 通过 stateObject 参数可以添加任意类型的数据到记录中；而 hash 只可添加短字符串；</li><li>pushState() 可额外设置 title 属性供后续使用。</li><li>hash模式下，仅hash符号之前的url会被包含在请求中，后端如果没有做到对路由的全覆盖，也不会返回404错误；history模式下，前端的url必须和实际向后端发起请求的url一致，如果没有对用的路由处理，将返回404错误。</li></ul><p>hash模式和history模式都有各自的优势和缺陷，还是要根据实际情况选择性的使用。</p><h3 id="_3-如何获取页面的hash变化" tabindex="-1">3. 如何获取页面的hash变化 <a class="header-anchor" href="#_3-如何获取页面的hash变化" aria-label="Permalink to &quot;3. 如何获取页面的hash变化&quot;">​</a></h3><p><strong>（1）监听$route的变化</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// 监听,当路由发生变化的时候执行</span></span>
<span class="line"><span style="color:#A6ACCD;">watch: {</span></span>
<span class="line"><span style="color:#A6ACCD;">  $route: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    handler: function(val, oldVal){</span></span>
<span class="line"><span style="color:#A6ACCD;">      console.log(val);</span></span>
<span class="line"><span style="color:#A6ACCD;">    },</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 深度观察监听</span></span>
<span class="line"><span style="color:#A6ACCD;">    deep: true</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">},</span></span></code></pre></div><p><strong>（2）window.location.hash读取#值</strong></p><p>window.location.hash 的值可读可写，读取来判断状态是否改变，写入时可以在不重载网页的前提下，添加一条历史访问记录。</p><h3 id="_4-route-和-router-的区别" tabindex="-1">4. $route 和$router 的区别 <a class="header-anchor" href="#_4-route-和-router-的区别" aria-label="Permalink to &quot;4. $route 和$router 的区别&quot;">​</a></h3><ul><li>$route 是“路由信息对象”，包括 path，params，hash，query，fullPath，matched，name 等路由信息参数</li><li>$router 是“路由实例”对象包括了路由的跳转方法，钩子函数等。</li></ul><h3 id="_5-如何定义动态路由-如何获取传过来的动态参数" tabindex="-1">5. 如何定义动态路由？如何获取传过来的动态参数？ <a class="header-anchor" href="#_5-如何定义动态路由-如何获取传过来的动态参数" aria-label="Permalink to &quot;5. 如何定义动态路由？如何获取传过来的动态参数？&quot;">​</a></h3><p><strong>（1）param方式</strong></p><ul><li>配置路由格式：<code>/router/:id</code></li><li>传递的方式：在path后面跟上对应的值</li><li>传递后形成的路径：<code>/router/123</code></li></ul><p>1）路由定义</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">//在APP.vue中</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;router-link :to=&quot;&#39;/user/&#39;+userId&quot; replace&gt;用户&lt;/router-link&gt;    </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">//在index.js</span></span>
<span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">   path: &#39;/user/:userid&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">   component: User,</span></span>
<span class="line"><span style="color:#A6ACCD;">},</span></span></code></pre></div><p>2）路由跳转</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// 方法1：</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;router-link :to=&quot;{ name: &#39;users&#39;, params: { uname: wade }}&quot;&gt;按钮&lt;/router-link</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 方法2：</span></span>
<span class="line"><span style="color:#A6ACCD;">this.$router.push({name:&#39;users&#39;,params:{uname:wade}})</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 方法3：</span></span>
<span class="line"><span style="color:#A6ACCD;">this.$router.push(&#39;/user/&#39; + wade)</span></span></code></pre></div><p>3）参数获取</p><p>通过 <code>$route.params.userid</code> 获取传递的值</p><p><strong>（2）query方式</strong></p><ul><li>配置路由格式：<code>/router</code>，也就是普通配置</li><li>传递的方式：对象中使用query的key作为传递方式</li><li>传递后形成的路径：<code>/route?id=123</code></li></ul><p>1）路由定义</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">//方式1：直接在router-link 标签上以对象的形式</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;router-link :to=&quot;{path:&#39;/profile&#39;,query:{name:&#39;why&#39;,age:28,height:188}}&quot;&gt;档案&lt;/router-link&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 方式2：写成按钮以点击事件形式</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;button @click=&#39;profileClick&#39;&gt;我的&lt;/button&gt;    </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">profileClick(){</span></span>
<span class="line"><span style="color:#A6ACCD;">  this.$router.push({</span></span>
<span class="line"><span style="color:#A6ACCD;">    path: &quot;/profile&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    query: {</span></span>
<span class="line"><span style="color:#A6ACCD;">        name: &quot;kobi&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">        age: &quot;28&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">        height: 198</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  });</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>2）跳转方法</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// 方法1：</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;router-link :to=&quot;{ name: &#39;users&#39;, query: { uname: james }}&quot;&gt;按钮&lt;/router-link&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 方法2：</span></span>
<span class="line"><span style="color:#A6ACCD;">this.$router.push({ name: &#39;users&#39;, query:{ uname:james }})</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 方法3：</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;router-link :to=&quot;{ path: &#39;/user&#39;, query: { uname:james }}&quot;&gt;按钮&lt;/router-link&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 方法4：</span></span>
<span class="line"><span style="color:#A6ACCD;">this.$router.push({ path: &#39;/user&#39;, query:{ uname:james }})</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 方法5：</span></span>
<span class="line"><span style="color:#A6ACCD;">this.$router.push(&#39;/user?uname=&#39; + jsmes)</span></span></code></pre></div><p>3）获取参数</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">通过$route.query 获取传递的值</span></span></code></pre></div><h3 id="_6-vue-router-路由钩子在生命周期的体现" tabindex="-1">6. Vue-router 路由钩子在生命周期的体现 <a class="header-anchor" href="#_6-vue-router-路由钩子在生命周期的体现" aria-label="Permalink to &quot;6. Vue-router 路由钩子在生命周期的体现&quot;">​</a></h3><p>一、Vue-Router导航守卫</p><p>有的时候，需要通过路由来进行一些操作，比如最常见的登录权限验证，当用户满足条件时，才让其进入导航，否则就取消跳转，并跳到登录页面让其登录。</p><p>为此有很多种方法可以植入路由的导航过程：全局的，单个路由独享的，或者组件级的</p><ol><li>全局路由钩子</li></ol><p>vue-router全局有三个路由钩子;</p><ul><li>router.beforeEach 全局前置守卫 进入路由之前</li><li>router.beforeResolve 全局解析守卫（2.5.0+）在 beforeRouteEnter 调用之后调用</li><li>router.afterEach 全局后置钩子 进入路由之后</li></ul><p>具体使用∶</p><ul><li>beforeEach（判断是否登录了，没登录就跳转到登录页）</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">router.beforeEach((to, from, next) =&gt; {  </span></span>
<span class="line"><span style="color:#A6ACCD;">    let ifInfo = Vue.prototype.$common.getSession(&#39;userData&#39;);  // 判断是否登录的存储信息</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (!ifInfo) { </span></span>
<span class="line"><span style="color:#A6ACCD;">        // sessionStorage里没有储存user信息    </span></span>
<span class="line"><span style="color:#A6ACCD;">        if (to.path == &#39;/&#39;) { </span></span>
<span class="line"><span style="color:#A6ACCD;">            //如果是登录页面路径，就直接next()      </span></span>
<span class="line"><span style="color:#A6ACCD;">            next();    </span></span>
<span class="line"><span style="color:#A6ACCD;">        } else { </span></span>
<span class="line"><span style="color:#A6ACCD;">            //不然就跳转到登录      </span></span>
<span class="line"><span style="color:#A6ACCD;">            Message.warning(&quot;请重新登录！&quot;);     </span></span>
<span class="line"><span style="color:#A6ACCD;">            window.location.href = Vue.prototype.$loginUrl;    </span></span>
<span class="line"><span style="color:#A6ACCD;">        }  </span></span>
<span class="line"><span style="color:#A6ACCD;">    } else {    </span></span>
<span class="line"><span style="color:#A6ACCD;">        return next();  </span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span></code></pre></div><ul><li>afterEach （跳转之后滚动条回到顶部）</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">router.afterEach((to, from) =&gt; {  </span></span>
<span class="line"><span style="color:#A6ACCD;">    // 跳转之后滚动条回到顶部  </span></span>
<span class="line"><span style="color:#A6ACCD;">    window.scrollTo(0,0);</span></span>
<span class="line"><span style="color:#A6ACCD;">});</span></span></code></pre></div><ol><li>单个路由独享钩子</li></ol><p><strong>beforeEnter</strong></p><p>如果不想全局配置守卫的话，可以为某些路由单独配置守卫，有三个参数∶ to、from、next</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">export default [    </span></span>
<span class="line"><span style="color:#A6ACCD;">    {        </span></span>
<span class="line"><span style="color:#A6ACCD;">        path: &#39;/&#39;,        </span></span>
<span class="line"><span style="color:#A6ACCD;">        name: &#39;login&#39;,        </span></span>
<span class="line"><span style="color:#A6ACCD;">        component: login,        </span></span>
<span class="line"><span style="color:#A6ACCD;">        beforeEnter: (to, from, next) =&gt; {          </span></span>
<span class="line"><span style="color:#A6ACCD;">            console.log(&#39;即将进入登录页面&#39;)          </span></span>
<span class="line"><span style="color:#A6ACCD;">            next()        </span></span>
<span class="line"><span style="color:#A6ACCD;">        }    </span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">]</span></span></code></pre></div><ol><li>组件内钩子</li></ol><p>beforeRouteUpdate、beforeRouteEnter、beforeRouteLeave</p><p>这三个钩子都有三个参数∶to、from、next</p><ul><li>beforeRouteEnter∶ 进入组件前触发</li><li>beforeRouteUpdate∶ 当前地址改变并且改组件被复用时触发，举例来说，带有动态参数的路径foo/∶id，在 /foo/1 和 /foo/2 之间跳转的时候，由于会渲染同样的foa组件，这个钩子在这种情况下就会被调用</li><li>beforeRouteLeave∶ 离开组件被调用</li></ul><p>注意点，beforeRouteEnter组件内还访问不到this，因为该守卫执行前组件实例还没有被创建，需要传一个回调给 next来访问，例如：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">beforeRouteEnter(to, from, next) {      </span></span>
<span class="line"><span style="color:#A6ACCD;">    next(target =&gt; {        </span></span>
<span class="line"><span style="color:#A6ACCD;">        if (from.path == &#39;/classProcess&#39;) {          </span></span>
<span class="line"><span style="color:#A6ACCD;">            target.isFromProcess = true        </span></span>
<span class="line"><span style="color:#A6ACCD;">        }      </span></span>
<span class="line"><span style="color:#A6ACCD;">    })    </span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>二、Vue路由钩子在生命周期函数的体现</p><ol><li>完整的路由导航解析流程（不包括其他生命周期）</li></ol><ul><li>触发进入其他路由。</li><li>调用要离开路由的组件守卫beforeRouteLeave</li><li>调用局前置守卫∶ beforeEach</li><li>在重用的组件里调用 beforeRouteUpdate</li><li>调用路由独享守卫 beforeEnter。</li><li>解析异步路由组件。</li><li>在将要进入的路由组件中调用 beforeRouteEnter</li><li>调用全局解析守卫 beforeResolve</li><li>导航被确认。</li><li>调用全局后置钩子的 afterEach 钩子。</li><li>触发DOM更新（mounted）。</li><li>执行beforeRouteEnter 守卫中传给 next 的回调函数</li></ul><ol><li>触发钩子的完整顺序</li></ol><p>路由导航、keep-alive、和组件生命周期钩子结合起来的，触发顺序，假设是从a组件离开，第一次进入b组件∶</p><ul><li>beforeRouteLeave：路由组件的组件离开路由前钩子，可取消路由离开。</li><li>beforeEach：路由全局前置守卫，可用于登录验证、全局路由loading等。</li><li>beforeEnter：路由独享守卫</li><li>beforeRouteEnter：路由组件的组件进入路由前钩子。</li><li>beforeResolve：路由全局解析守卫</li><li>afterEach：路由全局后置钩子</li><li>beforeCreate：组件生命周期，不能访问tAis。</li><li>created;组件生命周期，可以访问tAis，不能访问dom。</li><li>beforeMount：组件生命周期</li><li>deactivated：离开缓存组件a，或者触发a的beforeDestroy和destroyed组件销毁钩子。</li><li>mounted：访问/操作dom。</li><li>activated：进入缓存组件，进入a的嵌套子组件（如果有的话）。</li><li>执行beforeRouteEnter回调函数next。</li></ul><ol><li>导航行为被触发到导航完成的整个过程</li></ol><ul><li>导航行为被触发，此时导航未被确认。</li><li>在失活的组件里调用离开守卫 beforeRouteLeave。</li><li>调用全局的 beforeEach守卫。</li><li>在重用的组件里调用 beforeRouteUpdate 守卫(2.2+)。</li><li>在路由配置里调用 beforeEnteY。</li><li>解析异步路由组件（如果有）。</li><li>在被激活的组件里调用 beforeRouteEnter。</li><li>调用全局的 beforeResolve 守卫（2.5+），标示解析阶段完成。</li><li>导航被确认。</li><li>调用全局的 afterEach 钩子。</li><li>非重用组件，开始组件实例的生命周期：beforeCreate&amp;created、beforeMount&amp;mounted</li><li>触发 DOM 更新。</li><li>用创建好的实例调用 beforeRouteEnter守卫中传给 next 的回调函数。</li><li>导航完成</li></ul><h3 id="_7-vue-router跳转和location-href有什么区别" tabindex="-1">7. Vue-router跳转和location.href有什么区别 <a class="header-anchor" href="#_7-vue-router跳转和location-href有什么区别" aria-label="Permalink to &quot;7. Vue-router跳转和location.href有什么区别&quot;">​</a></h3><ul><li>使用 <code>location.href= /url </code>来跳转，简单方便，但是刷新了页面；</li><li>使用 <code>history.pushState( /url )</code> ，无刷新页面，静态跳转；</li><li>引进 router ，然后使用 <code>router.push( /url )</code> 来跳转，使用了 <code>diff</code> 算法，实现了按需加载，减少了 dom 的消耗。其实使用 router 跳转和使用 <code>history.pushState()</code> 没什么差别的，因为vue-router就是用了 <code>history.pushState()</code> ，尤其是在history模式下。</li></ul><h3 id="_8-params和query的区别" tabindex="-1">8. params和query的区别 <a class="header-anchor" href="#_8-params和query的区别" aria-label="Permalink to &quot;8. params和query的区别&quot;">​</a></h3><p><strong>用法</strong>：query要用path来引入，params要用name来引入，接收参数都是类似的，分别是 <code>this.$route.query.name</code> 和 <code>this.$route.params.name</code> 。</p><p><strong>url地址显示</strong>：query更加类似于ajax中get传参，params则类似于post，说的再简单一点，前者在浏览器地址栏中显示参数，后者则不显示</p><p><strong>注意</strong>：query刷新不会丢失query里面的数据 params刷新会丢失 params里面的数据。</p><h3 id="_9-vue-router-导航守卫有哪些" tabindex="-1">9. Vue-router 导航守卫有哪些 <a class="header-anchor" href="#_9-vue-router-导航守卫有哪些" aria-label="Permalink to &quot;9. Vue-router 导航守卫有哪些&quot;">​</a></h3><ul><li>全局前置/钩子：beforeEach、beforeResolve、afterEach</li><li>路由独享的守卫：beforeEnter</li><li>组件内的守卫：beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave</li></ul><h3 id="_10-对前端路由的理解" tabindex="-1">10. 对前端路由的理解 <a class="header-anchor" href="#_10-对前端路由的理解" aria-label="Permalink to &quot;10. 对前端路由的理解&quot;">​</a></h3><p>在前端技术早期，一个 url 对应一个页面，如果要从 A 页面切换到 B 页面，那么必然伴随着页面的刷新。这个体验并不好，不过在最初也是无奈之举——用户只有在刷新页面的情况下，才可以重新去请求数据。</p><p>后来，改变发生了——Ajax 出现了，它允许人们在不刷新页面的情况下发起请求；与之共生的，还有“不刷新页面即可更新页面内容”这种需求。在这样的背景下，出现了 <strong>SPA（单页面应用</strong>）。</p><p>SPA极大地提升了用户体验，它允许页面在不刷新的情况下更新页面内容，使内容的切换更加流畅。但是在 SPA 诞生之初，人们并没有考虑到“定位”这个问题——在内容切换前后，页面的 URL 都是一样的，这就带来了两个问题：</p><ul><li>SPA 其实并不知道当前的页面“进展到了哪一步”。可能在一个站点下经过了反复的“前进”才终于唤出了某一块内容，但是此时只要刷新一下页面，一切就会被清零，必须重复之前的操作、才可以重新对内容进行定位——SPA 并不会“记住”你的操作。</li><li>由于有且仅有一个 URL 给页面做映射，这对 SEO 也不够友好，搜索引擎无法收集全面的信息</li></ul><p>为了解决这个问题，前端路由出现了。</p><p>前端路由可以帮助我们在仅有一个页面的情况下，“记住”用户当前走到了哪一步——为 SPA 中的各个视图匹配一个唯一标识。这意味着用户前进、后退触发的新内容，都会映射到不同的 URL 上去。此时即便他刷新页面，因为当前的 URL 可以标识出他所处的位置，因此内容也不会丢失。</p><p>那么如何实现这个目的呢？首先要解决两个问题：</p><ul><li>当用户刷新页面时，浏览器会默认根据当前 URL 对资源进行重新定位（发送请求）。这个动作对 SPA 是不必要的，因为我们的 SPA 作为单页面，无论如何也只会有一个资源与之对应。此时若走正常的请求-刷新流程，反而会使用户的前进后退操作无法被记录。</li><li>单页面应用对服务端来说，就是一个URL、一套资源，那么如何做到用“不同的URL”来映射不同的视图内容呢？</li></ul><p>从这两个问题来看，服务端已经完全救不了这个场景了。所以要靠咱们前端自力更生，不然怎么叫“前端路由”呢？作为前端，可以提供这样的解决思路：</p><ul><li>拦截用户的刷新操作，避免服务端盲目响应、返回不符合预期的资源内容。把刷新这个动作完全放到前端逻辑里消化掉。</li><li>感知 URL 的变化。这里不是说要改造 URL、凭空制造出 N 个 URL 来。而是说 URL 还是那个 URL，只不过我们可以给它做一些微小的处理——这些处理并不会影响 URL 本身的性质，不会影响服务器对它的识别，只有我们前端感知的到。一旦我们感知到了，我们就根据这些变化、用 JS 去给它生成不同的内容。</li></ul><h2 id="五、vuex" tabindex="-1">五、Vuex <a class="header-anchor" href="#五、vuex" aria-label="Permalink to &quot;五、Vuex&quot;">​</a></h2><h3 id="_1-vuex-的原理" tabindex="-1">1. Vuex 的原理 <a class="header-anchor" href="#_1-vuex-的原理" aria-label="Permalink to &quot;1. Vuex 的原理&quot;">​</a></h3><p>Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。每一个 Vuex 应用的核心就是 store（仓库）。“store” 基本上就是一个容器，它包含着你的应用中大部分的状态 ( state )。</p><ul><li>Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。</li><li>改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样可以方便地跟踪每一个状态的变化。</li></ul><p><img src="https://cdn.nlark.com/yuque/0/2021/jpeg/1500604/1609522434579-ff590978-32e1-4cf5-bbbd-d8caf932f8d6.jpeg" alt="b025e120ca3d0bd2ded3d038d58cacf4.jpg"></p><p>Vuex为Vue Components建立起了一个完整的生态圈，包括开发中的API调用一环。</p><p><strong>（1）核心流程中的主要功能：</strong></p><ul><li>Vue Components 是 vue 组件，组件会触发（dispatch）一些事件或动作，也就是图中的 Actions;</li><li>在组件中发出的动作，肯定是想获取或者改变数据的，但是在 vuex 中，数据是集中管理的，不能直接去更改数据，所以会把这个动作提交（Commit）到 Mutations 中;</li><li>然后 Mutations 就去改变（Mutate）State 中的数据;</li><li>当 State 中的数据被改变之后，就会重新渲染（Render）到 Vue Components 中去，组件展示更新后的数据，完成一个流程。</li></ul><p><strong>（2）各模块在核心流程中的主要功能：</strong></p><ul><li><code>Vue Components</code>∶ Vue组件。HTML页面上，负责接收用户操作等交互行为，执行dispatch方法触发对应action进行回应。</li><li><code>dispatch</code>∶操作行为触发方法，是唯一能执行action的方法。</li><li><code>actions</code>∶ 操作行为处理模块。负责处理Vue Components接收到的所有交互行为。包含同步/异步操作，支持多个同名方法，按照注册的顺序依次触发。向后台API请求的操作就在这个模块中进行，包括触发其他action以及提交mutation的操作。该模块提供了Promise的封装，以支持action的链式触发。</li><li><code>commit</code>∶状态改变提交操作方法。对mutation进行提交，是唯一能执行mutation的方法。</li><li><code>mutations</code>∶状态改变操作方法。是Vuex修改state的唯一推荐方法，其他修改方式在严格模式下将会报错。该方法只能进行同步操作，且方法名只能全局唯一。操作之中会有一些hook暴露出来，以进行state的监控等。</li><li><code>state</code>∶ 页面状态管理容器对象。集中存储Vuecomponents中data对象的零散数据，全局唯一，以进行统一的状态管理。页面显示所需的数据从该对象中进行读取，利用Vue的细粒度数据响应机制来进行高效的状态更新。</li><li><code>getters</code>∶ state对象读取方法。图中没有单独列出该模块，应该被包含在了render中，Vue Components通过该方法读取全局state对象。</li></ul><h3 id="_2-vuex中action和mutation的区别" tabindex="-1">2. Vuex中action和mutation的区别 <a class="header-anchor" href="#_2-vuex中action和mutation的区别" aria-label="Permalink to &quot;2. Vuex中action和mutation的区别&quot;">​</a></h3><p>mutation中的操作是一系列的同步函数，用于修改state中的变量的的状态。当使用vuex时需要通过commit来提交需要操作的内容。mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是实际进行状态更改的地方，并且它会接受 state 作为第一个参数：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">const store = new Vuex.Store({</span></span>
<span class="line"><span style="color:#A6ACCD;">  state: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    count: 1</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  mutations: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    increment (state) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      state.count++      // 变更状态</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span></code></pre></div><p>当触发一个类型为 increment 的 mutation 时，需要调用此函数：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">store.commit(&#39;increment&#39;)</span></span></code></pre></div><p>而Action类似于mutation，不同点在于：</p><ul><li>Action 可以包含任意异步操作。</li><li>Action 提交的是 mutation，而不是直接变更状态。</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">const store = new Vuex.Store({</span></span>
<span class="line"><span style="color:#A6ACCD;">  state: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    count: 0</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  mutations: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    increment (state) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      state.count++</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  actions: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    increment (context) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      context.commit(&#39;increment&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span></code></pre></div><p>Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters。</p><p>所以，两者的不同点如下：</p><ul><li>Mutation专注于修改State，理论上是修改State的唯一途径；Action业务代码、异步请求。</li><li>Mutation：必须同步执行；Action：可以异步，但不能直接操作State。</li><li>在视图更新时，先触发actions，actions再触发mutation</li><li>mutation的参数是state，它包含store中的数据；store的参数是context，它是 state 的父级，包含 state、getters</li></ul><h3 id="_3-vuex-和-localstorage-的区别" tabindex="-1">3. Vuex 和 localStorage 的区别 <a class="header-anchor" href="#_3-vuex-和-localstorage-的区别" aria-label="Permalink to &quot;3. Vuex 和 localStorage 的区别&quot;">​</a></h3><p><strong>（1）最重要的区别</strong></p><ul><li>vuex存储在内存中</li><li>localstorage 则以文件的方式存储在本地，只能存储字符串类型的数据，存储对象需要 JSON的stringify和parse方法进行处理。 读取内存比读取硬盘速度要快</li></ul><p><strong>（2）应用场景</strong></p><ul><li>Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。vuex用于组件之间的传值。</li><li>localstorage是本地存储，是将数据存储到浏览器的方法，一般是在跨页面传递数据时使用 。</li><li>Vuex能做到数据的响应式，localstorage不能</li></ul><p><strong>（3）永久性</strong></p><p>刷新页面时vuex存储的值会丢失，localstorage不会。</p><p>**注意：**对于不变的数据确实可以用localstorage可以代替vuex，但是当两个组件共用一个数据源（对象或数组）时，如果其中一个组件改变了该数据源，希望另一个组件响应该变化时，localstorage无法做到，原因就是区别1。</p><h3 id="_4-redux-和-vuex-有什么区别-它们的共同思想" tabindex="-1">4. Redux 和 Vuex 有什么区别，它们的共同思想 <a class="header-anchor" href="#_4-redux-和-vuex-有什么区别-它们的共同思想" aria-label="Permalink to &quot;4. Redux 和 Vuex 有什么区别，它们的共同思想&quot;">​</a></h3><p><strong>（1）Redux 和 Vuex区别</strong></p><ul><li>Vuex改进了Redux中的Action和Reducer函数，以mutations变化函数取代Reducer，无需switch，只需在对应的mutation函数里改变state值即可</li><li>Vuex由于Vue自动重新渲染的特性，无需订阅重新渲染函数，只要生成新的State即可</li><li>Vuex数据流的顺序是∶View调用store.commit提交对应的请求到Store中对应的mutation函数-&gt;store改变（vue检测到数据变化自动渲染）</li></ul><p>通俗点理解就是，vuex 弱化 dispatch，通过commit进行 store状态的一次更变;取消了action概念，不必传入特定的 action形式进行指定变更;弱化reducer，基于commit参数直接对数据进行转变，使得框架更加简易;</p><p><strong>（2）共同思想</strong></p><ul><li>单—的数据源</li><li>变化可以预测</li></ul><p>本质上：redux与vuex都是对mvvm思想的服务，将数据从视图中抽离的一种方案;</p><p>形式上：vuex借鉴了redux，将store作为全局的数据中心，进行mode管理;</p><h3 id="_5-为什么要用-vuex-或者-redux" tabindex="-1">5. 为什么要用 Vuex 或者 Redux <a class="header-anchor" href="#_5-为什么要用-vuex-或者-redux" aria-label="Permalink to &quot;5. 为什么要用 Vuex 或者 Redux&quot;">​</a></h3><p>由于传参的方法对于多层嵌套的组件将会非常繁琐，并且对于兄弟组件间的状态传递无能为力。我们经常会采用父子组件直接引用或者通过事件来变更和同步状态的多份拷贝。以上的这些模式非常脆弱，通常会导致代码无法维护。</p><p>所以需要把组件的共享状态抽取出来，以一个全局单例模式管理。在这种模式下，组件树构成了一个巨大的&quot;视图&quot;，不管在树的哪个位置，任何组件都能获取状态或者触发行为。</p><p>另外，通过定义和隔离状态管理中的各种概念并强制遵守一定的规则，代码将会变得更结构化且易维护。</p><h3 id="_6-vuex有哪几种属性" tabindex="-1">6. Vuex有哪几种属性？ <a class="header-anchor" href="#_6-vuex有哪几种属性" aria-label="Permalink to &quot;6. Vuex有哪几种属性？&quot;">​</a></h3><p>有五种，分别是 State、 Getter、Mutation 、Action、 Module</p><ul><li>state =&gt; 基本数据(数据源存放地)</li><li>getters =&gt; 从基本数据派生出来的数据</li><li>mutations =&gt; 提交更改数据的方法，同步</li><li>actions =&gt; 像一个装饰器，包裹mutations，使之可以异步。</li><li>modules =&gt; 模块化Vuex</li></ul><h3 id="_7-vuex和单纯的全局对象有什么区别" tabindex="-1">7. Vuex和单纯的全局对象有什么区别？ <a class="header-anchor" href="#_7-vuex和单纯的全局对象有什么区别" aria-label="Permalink to &quot;7. Vuex和单纯的全局对象有什么区别？&quot;">​</a></h3><ul><li>Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。</li><li>不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样可以方便地跟踪每一个状态的变化，从而能够实现一些工具帮助更好地了解我们的应用。</li></ul><h3 id="_8-为什么-vuex-的-mutation-中不能做异步操作" tabindex="-1">8. 为什么 Vuex 的 mutation 中不能做异步操作？ <a class="header-anchor" href="#_8-为什么-vuex-的-mutation-中不能做异步操作" aria-label="Permalink to &quot;8. 为什么 Vuex 的 mutation 中不能做异步操作？&quot;">​</a></h3><ul><li>Vuex中所有的状态更新的唯一途径都是mutation，异步操作通过 Action 来提交 mutation实现，这样可以方便地跟踪每一个状态的变化，从而能够实现一些工具帮助更好地了解我们的应用。</li><li>每个mutation执行完成后都会对应到一个新的状态变更，这样devtools就可以打个快照存下来，然后就可以实现 time-travel 了。如果mutation支持异步操作，就没有办法知道状态是何时更新的，无法很好的进行状态的追踪，给调试带来困难。</li></ul><h3 id="_9-vuex的严格模式是什么-有什么作用-如何开启" tabindex="-1">9. Vuex的严格模式是什么,有什么作用，如何开启？ <a class="header-anchor" href="#_9-vuex的严格模式是什么-有什么作用-如何开启" aria-label="Permalink to &quot;9. Vuex的严格模式是什么,有什么作用，如何开启？&quot;">​</a></h3><p>在严格模式下，无论何时发生了状态变更且不是由mutation函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。</p><p>在Vuex.Store 构造器选项中开启,如下</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">const store = new Vuex.Store({</span></span>
<span class="line"><span style="color:#A6ACCD;">    strict:true,</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span></code></pre></div><h3 id="_10-如何在组件中批量使用vuex的getter属性" tabindex="-1">10. 如何在组件中批量使用Vuex的getter属性 <a class="header-anchor" href="#_10-如何在组件中批量使用vuex的getter属性" aria-label="Permalink to &quot;10. 如何在组件中批量使用Vuex的getter属性&quot;">​</a></h3><p>使用mapGetters辅助函数, 利用对象展开运算符将getter混入computed 对象中</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">import {mapGetters} from &#39;vuex&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">export default{</span></span>
<span class="line"><span style="color:#A6ACCD;">    computed:{</span></span>
<span class="line"><span style="color:#A6ACCD;">        ...mapGetters([&#39;total&#39;,&#39;discountTotal&#39;])</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h3 id="_11-如何在组件中重复使用vuex的mutation" tabindex="-1">11. 如何在组件中重复使用Vuex的mutation <a class="header-anchor" href="#_11-如何在组件中重复使用vuex的mutation" aria-label="Permalink to &quot;11. 如何在组件中重复使用Vuex的mutation&quot;">​</a></h3><p>使用mapMutations辅助函数,在组件中这么使用</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">import { mapMutations } from &#39;vuex&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">methods:{</span></span>
<span class="line"><span style="color:#A6ACCD;">    ...mapMutations({</span></span>
<span class="line"><span style="color:#A6ACCD;">        setNumber:&#39;SET_NUMBER&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    })</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>然后调用<code>this.setNumber(10)</code>相当调用<code>this.$store.commit(&#39;SET_NUMBER&#39;,10)</code></p><h2 id="六、vue-3-0" tabindex="-1">六、Vue 3.0 <a class="header-anchor" href="#六、vue-3-0" aria-label="Permalink to &quot;六、Vue 3.0&quot;">​</a></h2><h3 id="_1-vue3-0有什么更新" tabindex="-1">1. Vue3.0有什么更新 <a class="header-anchor" href="#_1-vue3-0有什么更新" aria-label="Permalink to &quot;1. Vue3.0有什么更新&quot;">​</a></h3><p><strong>（1）监测机制的改变</strong></p><ul><li>3.0 将带来基于代理 Proxy的 observer 实现，提供全语言覆盖的反应性跟踪。</li><li>消除了 Vue 2 当中基于 Object.defineProperty 的实现所存在的很多限制：</li></ul><p><strong>（2）只能监测属性，不能监测对象</strong></p><ul><li>检测属性的添加和删除；</li><li>检测数组索引和长度的变更；</li><li>支持 Map、Set、WeakMap 和 WeakSet。</li></ul><p><strong>（3）模板</strong></p><ul><li>作用域插槽，2.x 的机制导致作用域插槽变了，父组件会重新渲染，而 3.0 把作用域插槽改成了函数的方式，这样只会影响子组件的重新渲染，提升了渲染的性能。</li><li>同时，对于 render 函数的方面，vue3.0 也会进行一系列更改来方便习惯直接使用 api 来生成 vdom 。</li></ul><p><strong>（4）对象式的组件声明方式</strong></p><ul><li>vue2.x 中的组件是通过声明的方式传入一系列 option，和 TypeScript 的结合需要通过一些装饰器的方式来做，虽然能实现功能，但是比较麻烦。</li><li>3.0 修改了组件的声明方式，改成了类式的写法，这样使得和 TypeScript 的结合变得很容易</li></ul><p><strong>（5）其它方面的更改</strong></p><ul><li>支持自定义渲染器，从而使得 weex 可以通过自定义渲染器的方式来扩展，而不是直接 fork 源码来改的方式。</li><li>支持 Fragment（多个根节点）和 Protal（在 dom 其他部分渲染组建内容）组件，针对一些特殊的场景做了处理。</li><li>基于 tree shaking 优化，提供了更多的内置功能。</li></ul><h3 id="_2-defineproperty和proxy的区别" tabindex="-1">2. defineProperty和proxy的区别 <a class="header-anchor" href="#_2-defineproperty和proxy的区别" aria-label="Permalink to &quot;2. defineProperty和proxy的区别&quot;">​</a></h3><p>Vue 在实例初始化时遍历 data 中的所有属性，并使用 Object.defineProperty 把这些属性全部转为 getter/setter。这样当追踪数据发生变化时，setter 会被自动调用。</p><p>Object.defineProperty 是 ES5 中一个无法 shim 的特性，这也就是 Vue 不支持 IE8 以及更低版本浏览器的原因。</p><p>但是这样做有以下问题：</p><ol><li>添加或删除对象的属性时，Vue 检测不到。因为添加或删除的对象没有在初始化进行响应式处理，只能通过<code>$set</code> 来调用<code>Object.defineProperty()</code>处理。</li><li>无法监控到数组下标和长度的变化。</li></ol><p>Vue3 使用 Proxy 来监控数据的变化。Proxy 是 ES6 中提供的功能，其作用为：用于定义基本操作的自定义行为（如属性查找，赋值，枚举，函数调用等）。相对于<code>Object.defineProperty()</code>，其有以下特点：</p><ol><li>Proxy 直接代理整个对象而非对象属性，这样只需做一层代理就可以监听同级结构下的所有属性变化，包括新增属性和删除属性。</li><li>Proxy 可以监听数组的变化。</li></ol><h3 id="_3-vue3-0-为什么要用-proxy" tabindex="-1">3. Vue3.0 为什么要用 proxy？ <a class="header-anchor" href="#_3-vue3-0-为什么要用-proxy" aria-label="Permalink to &quot;3. Vue3.0 为什么要用 proxy？&quot;">​</a></h3><p>在 Vue2 中， 0bject.defineProperty 会改变原始数据，而 Proxy 是创建对象的虚拟表示，并提供 set 、get 和 deleteProperty 等处理器，这些处理器可在访问或修改原始对象上的属性时进行拦截，有以下特点∶</p><ul><li>不需用使用 <code>Vue.$set</code> 或 <code>Vue.$delete</code> 触发响应式。</li><li>全方位的数组变化检测，消除了Vue2 无效的边界情况。</li><li>支持 Map，Set，WeakMap 和 WeakSet。</li></ul><p>Proxy 实现的响应式原理与 Vue2的实现原理相同，实现方式大同小异∶</p><ul><li>get 收集依赖</li><li>Set、delete 等触发依赖</li><li>对于集合类型，就是对集合对象的方法做一层包装：原方法执行后执行依赖相关的收集或触发逻辑。</li></ul><h3 id="_4-vue-3-0-中的-vue-composition-api" tabindex="-1">4. Vue 3.0 中的 Vue Composition API？ <a class="header-anchor" href="#_4-vue-3-0-中的-vue-composition-api" aria-label="Permalink to &quot;4.  Vue 3.0 中的 Vue Composition API？&quot;">​</a></h3><p>在 Vue2 中，代码是 Options API 风格的，也就是通过填充 (option) data、methods、computed 等属性来完成一个 Vue 组件。这种风格使得 Vue 相对于 React极为容易上手，同时也造成了几个问题：</p><ol><li>由于 Options API 不够灵活的开发方式，使得Vue开发缺乏优雅的方法来在组件间共用代码。</li><li>Vue 组件过于依赖<code>this</code>上下文，Vue 背后的一些小技巧使得 Vue 组件的开发看起来与 JavaScript 的开发原则相悖，比如在<code>methods</code> 中的<code>this</code>竟然指向组件实例来不指向<code>methods</code>所在的对象。这也使得 TypeScript 在Vue2 中很不好用。</li></ol><p>于是在 Vue3 中，舍弃了 Options API，转而投向 Composition API。Composition API本质上是将 Options API 背后的机制暴露给用户直接使用，这样用户就拥有了更多的灵活性，也使得 Vue3 更适合于 TypeScript 结合。</p><p>如下，是一个使用了 Vue Composition API 的 Vue3 组件：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;button @click=&quot;increment&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    Count: {{ count }}</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/button&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">// Composition API 将组件属性暴露为函数，因此第一步是导入所需的函数</span></span>
<span class="line"><span style="color:#A6ACCD;">import { ref, computed, onMounted } from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">export default {</span></span>
<span class="line"><span style="color:#A6ACCD;">  setup() {</span></span>
<span class="line"><span style="color:#A6ACCD;">// 使用 ref 函数声明了称为 count 的响应属性，对应于Vue2中的data函数</span></span>
<span class="line"><span style="color:#A6ACCD;">    const count = ref(0)</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">// Vue2中需要在methods option中声明的函数，现在直接声明</span></span>
<span class="line"><span style="color:#A6ACCD;">    function increment() {</span></span>
<span class="line"><span style="color:#A6ACCD;">      count.value++</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"> // 对应于Vue2中的mounted声明周期</span></span>
<span class="line"><span style="color:#A6ACCD;">    onMounted(() =&gt; console.log(&#39;component mounted!&#39;))</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    return {</span></span>
<span class="line"><span style="color:#A6ACCD;">      count,</span></span>
<span class="line"><span style="color:#A6ACCD;">      increment</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span></code></pre></div><p>显而易见，Vue Composition API 使得 Vue3 的开发风格更接近于原生 JavaScript，带给开发者更多地灵活性</p><h3 id="_5-composition-api与react-hook很像-区别是什么" tabindex="-1">5. Composition API与React Hook很像，区别是什么 <a class="header-anchor" href="#_5-composition-api与react-hook很像-区别是什么" aria-label="Permalink to &quot;5. Composition API与React Hook很像，区别是什么&quot;">​</a></h3><p>从React Hook的实现角度看，React Hook是根据useState调用的顺序来确定下一次重渲染时的state是来源于哪个useState，所以出现了以下限制</p><ul><li>不能在循环、条件、嵌套函数中调用Hook</li><li>必须确保总是在你的React函数的顶层调用Hook</li><li>useEffect、useMemo等函数必须手动确定依赖关系</li></ul><p>而Composition API是基于Vue的响应式系统实现的，与React Hook的相比</p><ul><li>声明在setup函数内，一次组件实例化只调用一次setup，而React Hook每次重渲染都需要调用Hook，使得React的GC比Vue更有压力，性能也相对于Vue来说也较慢</li><li>Compositon API的调用不需要顾虑调用顺序，也可以在循环、条件、嵌套函数中使用</li><li>响应式系统自动实现了依赖收集，进而组件的部分的性能优化由Vue内部自己完成，而React Hook需要手动传入依赖，而且必须必须保证依赖的顺序，让useEffect、useMemo等函数正确的捕获依赖变量，否则会由于依赖不正确使得组件性能下降。</li></ul><p>虽然Compositon API看起来比React Hook好用，但是其设计思想也是借鉴React Hook的。</p><h2 id="七、虚拟dom" tabindex="-1">七、虚拟DOM <a class="header-anchor" href="#七、虚拟dom" aria-label="Permalink to &quot;七、虚拟DOM&quot;">​</a></h2><h3 id="_1-对虚拟dom的理解" tabindex="-1">1. 对虚拟DOM的理解？ <a class="header-anchor" href="#_1-对虚拟dom的理解" aria-label="Permalink to &quot;1. 对虚拟DOM的理解？&quot;">​</a></h3><p>从本质上来说，Virtual Dom是一个JavaScript对象，通过对象的方式来表示DOM结构。将页面的状态抽象为JS对象的形式，配合不同的渲染工具，使跨平台渲染成为可能。通过事务处理机制，将多次DOM修改的结果一次性的更新到页面上，从而有效的减少页面渲染的次数，减少修改DOM的重绘重排次数，提高渲染性能。</p><p>虚拟DOM是对DOM的抽象，这个对象是更加轻量级的对 DOM的描述。它设计的最初目的，就是更好的跨平台，比如Node.js就没有DOM，如果想实现SSR，那么一个方式就是借助虚拟DOM，因为虚拟DOM本身是js对象。 在代码渲染到页面之前，vue会把代码转换成一个对象（虚拟 DOM）。以对象的形式来描述真实DOM结构，最终渲染到页面。在每次数据发生变化前，虚拟DOM都会缓存一份，变化之时，现在的虚拟DOM会与缓存的虚拟DOM进行比较。在vue内部封装了diff算法，通过这个算法来进行比较，渲染时修改改变的变化，原先没有发生改变的通过原先的数据进行渲染。</p><p>另外现代前端框架的一个基本要求就是无须手动操作DOM，一方面是因为手动操作DOM无法保证程序性能，多人协作的项目中如果review不严格，可能会有开发者写出性能较低的代码，另一方面更重要的是省略手动DOM操作可以大大提高开发效率。</p><h3 id="_2-虚拟dom的解析过程" tabindex="-1">2. 虚拟DOM的解析过程 <a class="header-anchor" href="#_2-虚拟dom的解析过程" aria-label="Permalink to &quot;2. 虚拟DOM的解析过程&quot;">​</a></h3><p>虚拟DOM的解析过程：</p><ul><li>首先对将要插入到文档中的 DOM 树结构进行分析，使用 js 对象将其表示出来，比如一个元素对象，包含 TagName、props 和 Children 这些属性。然后将这个 js 对象树给保存下来，最后再将 DOM 片段插入到文档中。</li><li>当页面的状态发生改变，需要对页面的 DOM 的结构进行调整的时候，首先根据变更的状态，重新构建起一棵对象树，然后将这棵新的对象树和旧的对象树进行比较，记录下两棵树的的差异。</li><li>最后将记录的有差异的地方应用到真正的 DOM 树中去，这样视图就更新了。</li></ul><h3 id="_3-为什么要用虚拟dom" tabindex="-1">3. 为什么要用虚拟DOM <a class="header-anchor" href="#_3-为什么要用虚拟dom" aria-label="Permalink to &quot;3. 为什么要用虚拟DOM&quot;">​</a></h3><p><strong>（1）保证性能下限，在不进行手动优化的情况下，提供过得去的性能</strong></p><p>看一下页面渲染的流程：<strong>解析HTML -&gt; 生成DOM</strong> <strong>-&gt;</strong> <strong>生成 CSSOM</strong> <strong>-&gt;</strong> <strong>Layout</strong> <strong>-&gt;</strong> <strong>Paint</strong> <strong>-&gt;</strong> <strong>Compiler</strong></p><p>下面对比一下修改DOM时真实DOM操作和Virtual DOM的过程，来看一下它们重排重绘的性能消耗∶</p><ul><li>真实DOM∶ 生成HTML字符串＋重建所有的DOM元素</li><li>虚拟DOM∶ 生成vNode+ DOMDiff＋必要的dom更新</li></ul><p>Virtual DOM的更新DOM的准备工作耗费更多的时间，也就是JS层面，相比于更多的DOM操作它的消费是极其便宜的。尤雨溪在社区论坛中说道∶ 框架给你的保证是，你不需要手动优化的情况下，依然可以给你提供过得去的性能。</p><p><strong>（2）跨平台</strong></p><p>Virtual DOM本质上是JavaScript的对象，它可以很方便的跨平台操作，比如服务端渲染、uniapp等。</p><h3 id="_4-虚拟dom真的比真实dom性能好吗" tabindex="-1">4. 虚拟DOM真的比真实DOM性能好吗 <a class="header-anchor" href="#_4-虚拟dom真的比真实dom性能好吗" aria-label="Permalink to &quot;4. 虚拟DOM真的比真实DOM性能好吗&quot;">​</a></h3><ul><li>首次渲染大量DOM时，由于多了一层虚拟DOM的计算，会比innerHTML插入慢。</li><li>正如它能保证性能下限，在真实DOM操作的时候进行针对性的优化时，还是更快的。</li></ul><h3 id="_5-diff算法的原理" tabindex="-1">5. DIFF算法的原理 <a class="header-anchor" href="#_5-diff算法的原理" aria-label="Permalink to &quot;5. DIFF算法的原理&quot;">​</a></h3><p>在新老虚拟DOM对比时：</p><ul><li>首先，对比节点本身，判断是否为同一节点，如果不为相同节点，则删除该节点重新创建节点进行替换</li><li>如果为相同节点，进行patchVnode，判断如何对该节点的子节点进行处理，先判断一方有子节点一方没有子节点的情况(如果新的children没有子节点，将旧的子节点移除)</li><li>比较如果都有子节点，则进行updateChildren，判断如何对这些新老节点的子节点进行操作（diff核心）。</li><li>匹配时，找到相同的子节点，递归比较子节点</li></ul><p>在diff中，只对同层的子节点进行比较，放弃跨级的节点比较，使得时间复杂从O(n3)降低值O(n)，也就是说，只有当新旧children都为多个子节点时才需要用核心的Diff算法进行同层级比较。</p><h3 id="_6-vue中key的作用" tabindex="-1">6. Vue中key的作用 <a class="header-anchor" href="#_6-vue中key的作用" aria-label="Permalink to &quot;6. Vue中key的作用&quot;">​</a></h3><p>vue 中 key 值的作用可以分为两种情况来考虑：</p><ul><li>第一种情况是 v-if 中使用 key。由于 Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。因此当使用 v-if 来实现元素切换的时候，如果切换前后含有相同类型的元素，那么这个元素就会被复用。如果是相同的 input 元素，那么切换前后用户的输入不会被清除掉，这样是不符合需求的。因此可以通过使用 key 来唯一的标识一个元素，这个情况下，使用 key 的元素不会被复用。这个时候 key 的作用是用来标识一个独立的元素。</li><li>第二种情况是 v-for 中使用 key。用 v-for 更新已渲染过的元素列表时，它默认使用“就地复用”的策略。如果数据项的顺序发生了改变，Vue 不会移动 DOM 元素来匹配数据项的顺序，而是简单复用此处的每个元素。因此通过为每个列表项提供一个 key 值，来以便 Vue 跟踪元素的身份，从而高效的实现复用。这个时候 key 的作用是为了高效的更新渲染虚拟 DOM。</li></ul><p>key 是为 Vue 中 vnode 的唯一标记，通过这个 key，diff 操作可以更准确、更快速</p><ul><li>更准确：因为带 key 就不是就地复用了，在 sameNode 函数<code>a.key === b.key</code>对比中可以避免就地复用的情况。所以会更加准确。</li><li>更快速：利用 key 的唯一性生成 map 对象来获取对应节点，比遍历方式更快</li></ul><h3 id="_7-为什么不建议用index作为key" tabindex="-1">7. 为什么不建议用index作为key? <a class="header-anchor" href="#_7-为什么不建议用index作为key" aria-label="Permalink to &quot;7. 为什么不建议用index作为key?&quot;">​</a></h3><p>使用index 作为 key和没写基本上没区别，因为不管数组的顺序怎么颠倒，index 都是 0, 1, 2...这样排列，导致 Vue 会复用错误的旧子节点，做很多额外的工作。</p>`,371);function D(e,h,g,m,v,b){return o(),t("div",null,[i,s("p",null,[n("过滤器是一个函数，它会把表达式中的值始终当作函数的第一个参数。过滤器用在"),r,n(),s("code",null,"**"+l()+"**",1),n(" 和 "),C,n(),A,n(" 中，然后放在操作符“ "),u,n(" ”后面进行指示。")]),d,s("p",null,"使用vue开发时，在vue初始化之前，由于div是不归vue管的，所以我们写的代码在还没有解析的情况下会容易出现花屏现象，看到类似于"+l(e.message)+"的字样，虽然一般情况下这个时间很短暂，但是还是有必要让解决这个问题的。",1),y])}const q=p(c,[["render",D]]);export{x as __pageData,q as default};
