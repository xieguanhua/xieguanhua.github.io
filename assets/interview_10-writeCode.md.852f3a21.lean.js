import{_ as a,o as n,c as l,K as p}from"./chunks/framework.48aa973a.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"interview/10-writeCode.md","filePath":"interview/10-writeCode.md"}'),e={name:"interview/10-writeCode.md"};function o(t,s,c,r,i,y){return n(),l("div",null,s[0]||(s[0]=[p(`<p><img src="https://cdn.nlark.com/yuque/0/2021/png/1500604/1621676946378-71d6b405-ef4e-42e4-9e42-f9c9aafcefb6.png?x-oss-process=image%2Fresize%2Cw_1038" alt="手写代码面试题.png"></p><p>##手写系列建议配合鲨鱼哥的掘金手写面试题文章一起看（更多更全）</p><h2 id="一、javascript-基础" tabindex="-1">一、JavaScript 基础 <a class="header-anchor" href="#一、javascript-基础" aria-label="Permalink to &quot;一、JavaScript 基础&quot;">​</a></h2><h3 id="_1-手写-object-create" tabindex="-1">1. 手写 Object.create <a class="header-anchor" href="#_1-手写-object-create" aria-label="Permalink to &quot;1. 手写 Object.create&quot;">​</a></h3><p>思路：将传入的对象作为原型</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">function create(obj) {</span></span>
<span class="line"><span style="color:#babed8;">  function F() {}</span></span>
<span class="line"><span style="color:#babed8;">  F.prototype = obj</span></span>
<span class="line"><span style="color:#babed8;">  return new F()</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><h3 id="_2-手写-instanceof-方法" tabindex="-1">2. 手写 instanceof 方法 <a class="header-anchor" href="#_2-手写-instanceof-方法" aria-label="Permalink to &quot;2. 手写 instanceof 方法&quot;">​</a></h3><p>instanceof 运算符用于判断构造函数的 prototype 属性是否出现在对象的原型链中的任何位置。</p><p>实现步骤：</p><ol><li>首先获取类型的原型</li><li>然后获得对象的原型</li><li>然后一直循环判断对象的原型是否等于类型的原型，直到对象原型为 <code>null</code>，因为原型链最终为 <code>null</code></li></ol><p>具体实现：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">function myInstanceof(left, right) {</span></span>
<span class="line"><span style="color:#babed8;">  let proto = Object.getPrototypeOf(left), // 获取对象的原型</span></span>
<span class="line"><span style="color:#babed8;">      prototype = right.prototype; // 获取构造函数的 prototype 对象</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  // 判断构造函数的 prototype 对象是否在对象的原型链上</span></span>
<span class="line"><span style="color:#babed8;">  while (true) {</span></span>
<span class="line"><span style="color:#babed8;">    if (!proto) return false;</span></span>
<span class="line"><span style="color:#babed8;">    if (proto === prototype) return true;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    proto = Object.getPrototypeOf(proto);</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><h3 id="_3-手写-new-操作符" tabindex="-1">3. 手写 new 操作符 <a class="header-anchor" href="#_3-手写-new-操作符" aria-label="Permalink to &quot;3. 手写 new 操作符&quot;">​</a></h3><p>在调用 <code>new</code> 的过程中会发生以上四件事情：</p><p>（1）首先创建了一个新的空对象</p><p>（2）设置原型，将对象的原型设置为函数的 prototype 对象。</p><p>（3）让函数的 this 指向这个对象，执行构造函数的代码（为这个新对象添加属性）</p><p>（4）判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">function objectFactory() {</span></span>
<span class="line"><span style="color:#babed8;">  let newObject = null;</span></span>
<span class="line"><span style="color:#babed8;">  let constructor = Array.prototype.shift.call(arguments);</span></span>
<span class="line"><span style="color:#babed8;">  let result = null;</span></span>
<span class="line"><span style="color:#babed8;">  // 判断参数是否是一个函数</span></span>
<span class="line"><span style="color:#babed8;">  if (typeof constructor !== &quot;function&quot;) {</span></span>
<span class="line"><span style="color:#babed8;">    console.error(&quot;type error&quot;);</span></span>
<span class="line"><span style="color:#babed8;">    return;</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">  // 新建一个空对象，对象的原型为构造函数的 prototype 对象</span></span>
<span class="line"><span style="color:#babed8;">  newObject = Object.create(constructor.prototype);</span></span>
<span class="line"><span style="color:#babed8;">  // 将 this 指向新建对象，并执行函数</span></span>
<span class="line"><span style="color:#babed8;">  result = constructor.apply(newObject, arguments);</span></span>
<span class="line"><span style="color:#babed8;">  // 判断返回对象</span></span>
<span class="line"><span style="color:#babed8;">  let flag = result &amp;&amp; (typeof result === &quot;object&quot; || typeof result === &quot;function&quot;);</span></span>
<span class="line"><span style="color:#babed8;">  // 判断返回结果</span></span>
<span class="line"><span style="color:#babed8;">  return flag ? result : newObject;</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">// 使用方法</span></span>
<span class="line"><span style="color:#babed8;">objectFactory(构造函数, 初始化参数);</span></span></code></pre></div><h3 id="_4-手写-promise" tabindex="-1">4. 手写 Promise <a class="header-anchor" href="#_4-手写-promise" aria-label="Permalink to &quot;4. 手写 Promise&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">const PENDING = &quot;pending&quot;;</span></span>
<span class="line"><span style="color:#babed8;">const RESOLVED = &quot;resolved&quot;;</span></span>
<span class="line"><span style="color:#babed8;">const REJECTED = &quot;rejected&quot;;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">function MyPromise(fn) {</span></span>
<span class="line"><span style="color:#babed8;">  // 保存初始化状态</span></span>
<span class="line"><span style="color:#babed8;">  var self = this;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  // 初始化状态</span></span>
<span class="line"><span style="color:#babed8;">  this.state = PENDING;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  // 用于保存 resolve 或者 rejected 传入的值</span></span>
<span class="line"><span style="color:#babed8;">  this.value = null;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  // 用于保存 resolve 的回调函数</span></span>
<span class="line"><span style="color:#babed8;">  this.resolvedCallbacks = [];</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  // 用于保存 reject 的回调函数</span></span>
<span class="line"><span style="color:#babed8;">  this.rejectedCallbacks = [];</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  // 状态转变为 resolved 方法</span></span>
<span class="line"><span style="color:#babed8;">  function resolve(value) {</span></span>
<span class="line"><span style="color:#babed8;">    // 判断传入元素是否为 Promise 值，如果是，则状态改变必须等待前一个状态改变后再进行改变</span></span>
<span class="line"><span style="color:#babed8;">    if (value instanceof MyPromise) {</span></span>
<span class="line"><span style="color:#babed8;">      return value.then(resolve, reject);</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    // 保证代码的执行顺序为本轮事件循环的末尾</span></span>
<span class="line"><span style="color:#babed8;">    setTimeout(() =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">      // 只有状态为 pending 时才能转变，</span></span>
<span class="line"><span style="color:#babed8;">      if (self.state === PENDING) {</span></span>
<span class="line"><span style="color:#babed8;">        // 修改状态</span></span>
<span class="line"><span style="color:#babed8;">        self.state = RESOLVED;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">        // 设置传入的值</span></span>
<span class="line"><span style="color:#babed8;">        self.value = value;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">        // 执行回调函数</span></span>
<span class="line"><span style="color:#babed8;">        self.resolvedCallbacks.forEach(callback =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">          callback(value);</span></span>
<span class="line"><span style="color:#babed8;">        });</span></span>
<span class="line"><span style="color:#babed8;">      }</span></span>
<span class="line"><span style="color:#babed8;">    }, 0);</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  // 状态转变为 rejected 方法</span></span>
<span class="line"><span style="color:#babed8;">  function reject(value) {</span></span>
<span class="line"><span style="color:#babed8;">    // 保证代码的执行顺序为本轮事件循环的末尾</span></span>
<span class="line"><span style="color:#babed8;">    setTimeout(() =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">      // 只有状态为 pending 时才能转变</span></span>
<span class="line"><span style="color:#babed8;">      if (self.state === PENDING) {</span></span>
<span class="line"><span style="color:#babed8;">        // 修改状态</span></span>
<span class="line"><span style="color:#babed8;">        self.state = REJECTED;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">        // 设置传入的值</span></span>
<span class="line"><span style="color:#babed8;">        self.value = value;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">        // 执行回调函数</span></span>
<span class="line"><span style="color:#babed8;">        self.rejectedCallbacks.forEach(callback =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">          callback(value);</span></span>
<span class="line"><span style="color:#babed8;">        });</span></span>
<span class="line"><span style="color:#babed8;">      }</span></span>
<span class="line"><span style="color:#babed8;">    }, 0);</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  // 将两个方法传入函数执行</span></span>
<span class="line"><span style="color:#babed8;">  try {</span></span>
<span class="line"><span style="color:#babed8;">    fn(resolve, reject);</span></span>
<span class="line"><span style="color:#babed8;">  } catch (e) {</span></span>
<span class="line"><span style="color:#babed8;">    // 遇到错误时，捕获错误，执行 reject 函数</span></span>
<span class="line"><span style="color:#babed8;">    reject(e);</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">MyPromise.prototype.then = function(onResolved, onRejected) {</span></span>
<span class="line"><span style="color:#babed8;">  // 首先判断两个参数是否为函数类型，因为这两个参数是可选参数</span></span>
<span class="line"><span style="color:#babed8;">  onResolved =</span></span>
<span class="line"><span style="color:#babed8;">    typeof onResolved === &quot;function&quot;</span></span>
<span class="line"><span style="color:#babed8;">      ? onResolved</span></span>
<span class="line"><span style="color:#babed8;">      : function(value) {</span></span>
<span class="line"><span style="color:#babed8;">          return value;</span></span>
<span class="line"><span style="color:#babed8;">        };</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  onRejected =</span></span>
<span class="line"><span style="color:#babed8;">    typeof onRejected === &quot;function&quot;</span></span>
<span class="line"><span style="color:#babed8;">      ? onRejected</span></span>
<span class="line"><span style="color:#babed8;">      : function(error) {</span></span>
<span class="line"><span style="color:#babed8;">          throw error;</span></span>
<span class="line"><span style="color:#babed8;">        };</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  // 如果是等待状态，则将函数加入对应列表中</span></span>
<span class="line"><span style="color:#babed8;">  if (this.state === PENDING) {</span></span>
<span class="line"><span style="color:#babed8;">    this.resolvedCallbacks.push(onResolved);</span></span>
<span class="line"><span style="color:#babed8;">    this.rejectedCallbacks.push(onRejected);</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  // 如果状态已经凝固，则直接执行对应状态的函数</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  if (this.state === RESOLVED) {</span></span>
<span class="line"><span style="color:#babed8;">    onResolved(this.value);</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  if (this.state === REJECTED) {</span></span>
<span class="line"><span style="color:#babed8;">    onRejected(this.value);</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">};</span></span></code></pre></div><h3 id="_5-手写-promise-then" tabindex="-1">5. 手写 Promise.then <a class="header-anchor" href="#_5-手写-promise-then" aria-label="Permalink to &quot;5. 手写 Promise.then&quot;">​</a></h3><p><code>then</code> 方法返回一个新的 <code>promise</code> 实例，为了在 <code>promise</code> 状态发生变化时（<code>resolve</code> / <code>reject</code> 被调用时）再执行 <code>then</code> 里的函数，我们使用一个 <code>callbacks</code> 数组先把传给then的函数暂存起来，等状态改变时再调用。</p><p><strong>那么，怎么保证后一个</strong> <code>**then**</code> <strong>里的方法在前一个</strong> <code>**then**</code><strong>（可能是异步）结束之后再执行呢？</strong></p><p>我们可以将传给 <code>then</code> 的函数和新 <code>promise</code> 的 <code>resolve</code> 一起 <code>push</code> 到前一个 <code>promise</code> 的 <code>callbacks</code> 数组中，达到承前启后的效果：</p><ul><li>承前：当前一个 <code>promise</code> 完成后，调用其 <code>resolve</code> 变更状态，在这个 <code>resolve</code> 里会依次调用 <code>callbacks</code> 里的回调，这样就执行了 <code>then</code> 里的方法了</li><li>启后：上一步中，当 <code>then</code> 里的方法执行完成后，返回一个结果，如果这个结果是个简单的值，就直接调用新 <code>promise</code> 的 <code>resolve</code>，让其状态变更，这又会依次调用新 <code>promise</code> 的 <code>callbacks</code> 数组里的方法，循环往复。。如果返回的结果是个 <code>promise</code>，则需要等它完成之后再触发新 <code>promise</code> 的 <code>resolve</code>，所以可以在其结果的 <code>then</code> 里调用新 <code>promise</code> 的 <code>resolve</code></li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">then(onFulfilled, onReject){</span></span>
<span class="line"><span style="color:#babed8;">    // 保存前一个promise的this</span></span>
<span class="line"><span style="color:#babed8;">    const self = this; </span></span>
<span class="line"><span style="color:#babed8;">    return new MyPromise((resolve, reject) =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">      // 封装前一个promise成功时执行的函数</span></span>
<span class="line"><span style="color:#babed8;">      let fulfilled = () =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">        try{</span></span>
<span class="line"><span style="color:#babed8;">          const result = onFulfilled(self.value); // 承前</span></span>
<span class="line"><span style="color:#babed8;">          return result instanceof MyPromise? result.then(resolve, reject) : resolve(result); //启后</span></span>
<span class="line"><span style="color:#babed8;">        }catch(err){</span></span>
<span class="line"><span style="color:#babed8;">          reject(err)</span></span>
<span class="line"><span style="color:#babed8;">        }</span></span>
<span class="line"><span style="color:#babed8;">      }</span></span>
<span class="line"><span style="color:#babed8;">      // 封装前一个promise失败时执行的函数</span></span>
<span class="line"><span style="color:#babed8;">      let rejected = () =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">        try{</span></span>
<span class="line"><span style="color:#babed8;">          const result = onReject(self.reason);</span></span>
<span class="line"><span style="color:#babed8;">          return result instanceof MyPromise? result.then(resolve, reject) : reject(result);</span></span>
<span class="line"><span style="color:#babed8;">        }catch(err){</span></span>
<span class="line"><span style="color:#babed8;">          reject(err)</span></span>
<span class="line"><span style="color:#babed8;">        }</span></span>
<span class="line"><span style="color:#babed8;">      }</span></span>
<span class="line"><span style="color:#babed8;">      switch(self.status){</span></span>
<span class="line"><span style="color:#babed8;">        case PENDING: </span></span>
<span class="line"><span style="color:#babed8;">          self.onFulfilledCallbacks.push(fulfilled);</span></span>
<span class="line"><span style="color:#babed8;">          self.onRejectedCallbacks.push(rejected);</span></span>
<span class="line"><span style="color:#babed8;">          break;</span></span>
<span class="line"><span style="color:#babed8;">        case FULFILLED:</span></span>
<span class="line"><span style="color:#babed8;">          fulfilled();</span></span>
<span class="line"><span style="color:#babed8;">          break;</span></span>
<span class="line"><span style="color:#babed8;">        case REJECT:</span></span>
<span class="line"><span style="color:#babed8;">          rejected();</span></span>
<span class="line"><span style="color:#babed8;">          break;</span></span>
<span class="line"><span style="color:#babed8;">      }</span></span>
<span class="line"><span style="color:#babed8;">    })</span></span>
<span class="line"><span style="color:#babed8;">   }</span></span></code></pre></div><p><strong>注意：</strong></p><ul><li>连续多个 <code>then</code> 里的回调方法是同步注册的，但注册到了不同的 <code>callbacks</code> 数组中，因为每次 <code>then</code> 都返回新的 <code>promise</code> 实例（参考上面的例子和图）</li><li>注册完成后开始执行构造函数中的异步事件，异步完成之后依次调用 <code>callbacks</code> 数组中提前注册的回调</li></ul><h3 id="_6-手写-promise-all" tabindex="-1">6. 手写 Promise.all <a class="header-anchor" href="#_6-手写-promise-all" aria-label="Permalink to &quot;6. 手写 Promise.all&quot;">​</a></h3><p><strong>1) 核心思路</strong></p><ol><li>接收一个 Promise 实例的数组或具有 Iterator 接口的对象作为参数</li><li>这个方法返回一个新的 promise 对象，</li><li>遍历传入的参数，用Promise.resolve()将参数&quot;包一层&quot;，使其变成一个promise对象</li><li>参数所有回调成功才是成功，返回值数组与参数顺序一致</li><li>参数数组其中一个失败，则触发失败状态，第一个触发失败的 Promise 错误信息作为 Promise.all 的错误信息。</li></ol><p><strong>2）实现代码</strong></p><p>一般来说，Promise.all 用来处理多个并发请求，也是为了页面数据构造的方便，将一个页面所用到的在不同接口的数据一起请求过来，不过，如果其中一个接口失败了，多个请求也就失败了，页面可能啥也出不来，这就看当前页面的耦合程度了</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">promiseAll</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">promises</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">Promise</span><span style="color:#F07178;">(</span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">resolve</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#BABED8;font-style:italic;">reject</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">!</span><span style="color:#BABED8;">Array</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">isArray</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">promises</span><span style="color:#F07178;">))</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;font-style:italic;">throw</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">TypeError</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">argument must be a array</span><span style="color:#89DDFF;">\`</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">var</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">resolvedCounter</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">var</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">promiseNum</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">promises</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">length</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">var</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">resolvedResult</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> []</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#F07178;"> (</span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">i</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">i</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">promiseNum</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">i</span><span style="color:#89DDFF;">++</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#FFCB6B;">Promise</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">resolve</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">promises</span><span style="color:#F07178;">[</span><span style="color:#BABED8;">i</span><span style="color:#F07178;">])</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">then</span><span style="color:#F07178;">(</span><span style="color:#BABED8;font-style:italic;">value</span><span style="color:#C792EA;">=&gt;</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#BABED8;">resolvedCounter</span><span style="color:#89DDFF;">++;</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#BABED8;">resolvedResult</span><span style="color:#F07178;">[</span><span style="color:#BABED8;">i</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">value</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#BABED8;">resolvedCounter</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">==</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">promiseNum</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">resolve</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">resolvedResult</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">          </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">},</span><span style="color:#BABED8;font-style:italic;">error</span><span style="color:#C792EA;">=&gt;</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">reject</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">error</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// test</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#BABED8;"> p1 </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">new</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">Promise</span><span style="color:#BABED8;">(</span><span style="color:#C792EA;">function</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">resolve</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#BABED8;font-style:italic;">reject</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">setTimeout</span><span style="color:#F07178;">(</span><span style="color:#C792EA;">function</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#82AAFF;">resolve</span><span style="color:#F07178;">(</span><span style="color:#F78C6C;">1</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">},</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1000</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#BABED8;">)</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#BABED8;"> p2 </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">new</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">Promise</span><span style="color:#BABED8;">(</span><span style="color:#C792EA;">function</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">resolve</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#BABED8;font-style:italic;">reject</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">setTimeout</span><span style="color:#F07178;">(</span><span style="color:#C792EA;">function</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#82AAFF;">resolve</span><span style="color:#F07178;">(</span><span style="color:#F78C6C;">2</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">},</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">2000</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#BABED8;">)</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#BABED8;"> p3 </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">new</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">Promise</span><span style="color:#BABED8;">(</span><span style="color:#C792EA;">function</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">resolve</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#BABED8;font-style:italic;">reject</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">setTimeout</span><span style="color:#F07178;">(</span><span style="color:#C792EA;">function</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#82AAFF;">resolve</span><span style="color:#F07178;">(</span><span style="color:#F78C6C;">3</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">},</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">3000</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#BABED8;">)</span></span>
<span class="line"><span style="color:#82AAFF;">promiseAll</span><span style="color:#BABED8;">([p3</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> p1</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> p2])</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">then</span><span style="color:#BABED8;">(</span><span style="color:#BABED8;font-style:italic;">res</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">res</span><span style="color:#F07178;">) </span><span style="color:#676E95;font-style:italic;">// [3, 1, 2]</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#BABED8;">)</span></span></code></pre></div><h3 id="_7-手写-promise-race" tabindex="-1">7. 手写 Promise.race <a class="header-anchor" href="#_7-手写-promise-race" aria-label="Permalink to &quot;7. 手写 Promise.race&quot;">​</a></h3><p>该方法的参数是 Promise 实例数组, 然后其 then 注册的回调方法是数组中的某一个 Promise 的状态变为 fulfilled 的时候就执行. 因为 Promise 的状态<strong>只能改变一次</strong>, 那么我们只需要把 Promise.race 中产生的 Promise 对象的 resolve 方法, 注入到数组中的每一个 Promise 实例中的回调函数中即可.</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">Promise.race = function (args) {</span></span>
<span class="line"><span style="color:#babed8;">  return new Promise((resolve, reject) =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">    for (let i = 0, len = args.length; i &lt; len; i++) {</span></span>
<span class="line"><span style="color:#babed8;">      args[i].then(resolve, reject)</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">  })</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><h3 id="_8-手写防抖函数" tabindex="-1">8. 手写防抖函数 <a class="header-anchor" href="#_8-手写防抖函数" aria-label="Permalink to &quot;8. 手写防抖函数&quot;">​</a></h3><p>函数防抖是指在事件被触发 n 秒后再执行回调，如果在这 n 秒内事件又被触发，则重新计时。这可以使用在一些点击请求的事件上，避免因为用户的多次点击向后端发送多次请求。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">// 函数防抖的实现</span></span>
<span class="line"><span style="color:#babed8;">function debounce(fn, wait) {</span></span>
<span class="line"><span style="color:#babed8;">  let timer = null;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  return function() {</span></span>
<span class="line"><span style="color:#babed8;">    let context = this,</span></span>
<span class="line"><span style="color:#babed8;">        args = arguments;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    // 如果此时存在定时器的话，则取消之前的定时器重新记时</span></span>
<span class="line"><span style="color:#babed8;">    if (timer) {</span></span>
<span class="line"><span style="color:#babed8;">      clearTimeout(timer);</span></span>
<span class="line"><span style="color:#babed8;">      timer = null;</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    // 设置定时器，使事件间隔指定事件后执行</span></span>
<span class="line"><span style="color:#babed8;">    timer = setTimeout(() =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">      fn.apply(context, args);</span></span>
<span class="line"><span style="color:#babed8;">    }, wait);</span></span>
<span class="line"><span style="color:#babed8;">  };</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><h3 id="_9-手写节流函数" tabindex="-1">9. 手写节流函数 <a class="header-anchor" href="#_9-手写节流函数" aria-label="Permalink to &quot;9. 手写节流函数&quot;">​</a></h3><p>函数节流是指规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。节流可以使用在 scroll 函数的事件监听上，通过事件节流来降低事件调用的频率。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">// 函数节流的实现;</span></span>
<span class="line"><span style="color:#babed8;">function throttle(fn, delay) {</span></span>
<span class="line"><span style="color:#babed8;">  let curTime = Date.now();</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  return function() {</span></span>
<span class="line"><span style="color:#babed8;">    let context = this,</span></span>
<span class="line"><span style="color:#babed8;">        args = arguments,</span></span>
<span class="line"><span style="color:#babed8;">        nowTime = Date.now();</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    // 如果两次时间间隔超过了指定时间，则执行函数。</span></span>
<span class="line"><span style="color:#babed8;">    if (nowTime - curTime &gt;= delay) {</span></span>
<span class="line"><span style="color:#babed8;">      curTime = Date.now();</span></span>
<span class="line"><span style="color:#babed8;">      return fn.apply(context, args);</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">  };</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><h3 id="_10-手写类型判断函数" tabindex="-1">10. 手写类型判断函数 <a class="header-anchor" href="#_10-手写类型判断函数" aria-label="Permalink to &quot;10. 手写类型判断函数&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">function getType(value) {</span></span>
<span class="line"><span style="color:#babed8;">  // 判断数据是 null 的情况</span></span>
<span class="line"><span style="color:#babed8;">  if (value === null) {</span></span>
<span class="line"><span style="color:#babed8;">    return value + &quot;&quot;;</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">  // 判断数据是引用类型的情况</span></span>
<span class="line"><span style="color:#babed8;">  if (typeof value === &quot;object&quot;) {</span></span>
<span class="line"><span style="color:#babed8;">    let valueClass = Object.prototype.toString.call(value),</span></span>
<span class="line"><span style="color:#babed8;">      type = valueClass.split(&quot; &quot;)[1].split(&quot;&quot;);</span></span>
<span class="line"><span style="color:#babed8;">    type.pop();</span></span>
<span class="line"><span style="color:#babed8;">    return type.join(&quot;&quot;).toLowerCase();</span></span>
<span class="line"><span style="color:#babed8;">  } else {</span></span>
<span class="line"><span style="color:#babed8;">    // 判断数据是基本数据类型的情况和函数的情况</span></span>
<span class="line"><span style="color:#babed8;">    return typeof value;</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><h3 id="_11-手写-call-函数" tabindex="-1">11. 手写 call 函数 <a class="header-anchor" href="#_11-手写-call-函数" aria-label="Permalink to &quot;11. 手写 call 函数&quot;">​</a></h3><p>call 函数的实现步骤：</p><ol><li>判断调用对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。</li><li>判断传入上下文对象是否存在，如果不存在，则设置为 window 。</li><li>处理传入的参数，截取第一个参数后的所有参数。</li><li>将函数作为上下文对象的一个属性。</li><li>使用上下文对象来调用这个方法，并保存返回结果。</li><li>删除刚才新增的属性。</li><li>返回结果。</li></ol><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">// call函数实现</span></span>
<span class="line"><span style="color:#babed8;">Function.prototype.myCall = function(context) {</span></span>
<span class="line"><span style="color:#babed8;">  // 判断调用对象</span></span>
<span class="line"><span style="color:#babed8;">  if (typeof this !== &quot;function&quot;) {</span></span>
<span class="line"><span style="color:#babed8;">    console.error(&quot;type error&quot;);</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">  // 获取参数</span></span>
<span class="line"><span style="color:#babed8;">  let args = [...arguments].slice(1),</span></span>
<span class="line"><span style="color:#babed8;">      result = null;</span></span>
<span class="line"><span style="color:#babed8;">  // 判断 context 是否传入，如果未传入则设置为 window</span></span>
<span class="line"><span style="color:#babed8;">  context = context || window;</span></span>
<span class="line"><span style="color:#babed8;">  // 将调用函数设为对象的方法</span></span>
<span class="line"><span style="color:#babed8;">  context.fn = this;</span></span>
<span class="line"><span style="color:#babed8;">  // 调用函数</span></span>
<span class="line"><span style="color:#babed8;">  result = context.fn(...args);</span></span>
<span class="line"><span style="color:#babed8;">  // 将属性删除</span></span>
<span class="line"><span style="color:#babed8;">  delete context.fn;</span></span>
<span class="line"><span style="color:#babed8;">  return result;</span></span>
<span class="line"><span style="color:#babed8;">};</span></span></code></pre></div><h3 id="_12-手写-apply-函数" tabindex="-1">12. 手写 apply 函数 <a class="header-anchor" href="#_12-手写-apply-函数" aria-label="Permalink to &quot;12. 手写 apply 函数&quot;">​</a></h3><p>apply 函数的实现步骤：</p><ol><li>判断调用对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。</li><li>判断传入上下文对象是否存在，如果不存在，则设置为 window 。</li><li>将函数作为上下文对象的一个属性。</li><li>判断参数值是否传入</li><li>使用上下文对象来调用这个方法，并保存返回结果。</li><li>删除刚才新增的属性</li><li>返回结果</li></ol><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">// apply 函数实现</span></span>
<span class="line"><span style="color:#babed8;">Function.prototype.myApply = function(context) {</span></span>
<span class="line"><span style="color:#babed8;">  // 判断调用对象是否为函数</span></span>
<span class="line"><span style="color:#babed8;">  if (typeof this !== &quot;function&quot;) {</span></span>
<span class="line"><span style="color:#babed8;">    throw new TypeError(&quot;Error&quot;);</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">  let result = null;</span></span>
<span class="line"><span style="color:#babed8;">  // 判断 context 是否存在，如果未传入则为 window</span></span>
<span class="line"><span style="color:#babed8;">  context = context || window;</span></span>
<span class="line"><span style="color:#babed8;">  // 将函数设为对象的方法</span></span>
<span class="line"><span style="color:#babed8;">  context.fn = this;</span></span>
<span class="line"><span style="color:#babed8;">  // 调用方法</span></span>
<span class="line"><span style="color:#babed8;">  if (arguments[1]) {</span></span>
<span class="line"><span style="color:#babed8;">    result = context.fn(...arguments[1]);</span></span>
<span class="line"><span style="color:#babed8;">  } else {</span></span>
<span class="line"><span style="color:#babed8;">    result = context.fn();</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">  // 将属性删除</span></span>
<span class="line"><span style="color:#babed8;">  delete context.fn;</span></span>
<span class="line"><span style="color:#babed8;">  return result;</span></span>
<span class="line"><span style="color:#babed8;">};</span></span></code></pre></div><h3 id="_13-手写-bind-函数" tabindex="-1">13. 手写 bind 函数 <a class="header-anchor" href="#_13-手写-bind-函数" aria-label="Permalink to &quot;13. 手写 bind 函数&quot;">​</a></h3><p>bind 函数的实现步骤：</p><ol><li>判断调用对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。</li><li>保存当前函数的引用，获取其余传入参数值。</li><li>创建一个函数返回</li><li>函数内部使用 apply 来绑定函数调用，需要判断函数作为构造函数的情况，这个时候需要传入当前函数的 this 给 apply 调用，其余情况都传入指定的上下文对象。</li></ol><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">// bind 函数实现</span></span>
<span class="line"><span style="color:#babed8;">Function.prototype.myBind = function(context) {</span></span>
<span class="line"><span style="color:#babed8;">  // 判断调用对象是否为函数</span></span>
<span class="line"><span style="color:#babed8;">  if (typeof this !== &quot;function&quot;) {</span></span>
<span class="line"><span style="color:#babed8;">    throw new TypeError(&quot;Error&quot;);</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">  // 获取参数</span></span>
<span class="line"><span style="color:#babed8;">  var args = [...arguments].slice(1),</span></span>
<span class="line"><span style="color:#babed8;">      fn = this;</span></span>
<span class="line"><span style="color:#babed8;">  return function Fn() {</span></span>
<span class="line"><span style="color:#babed8;">    // 根据调用方式，传入不同绑定值</span></span>
<span class="line"><span style="color:#babed8;">    return fn.apply(</span></span>
<span class="line"><span style="color:#babed8;">      this instanceof Fn ? this : context,</span></span>
<span class="line"><span style="color:#babed8;">      args.concat(...arguments)</span></span>
<span class="line"><span style="color:#babed8;">    );</span></span>
<span class="line"><span style="color:#babed8;">  };</span></span>
<span class="line"><span style="color:#babed8;">};</span></span></code></pre></div><h3 id="_14-函数柯里化的实现" tabindex="-1">14. 函数柯里化的实现 <a class="header-anchor" href="#_14-函数柯里化的实现" aria-label="Permalink to &quot;14. 函数柯里化的实现&quot;">​</a></h3><p>函数柯里化指的是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">function curry(fn, args) {</span></span>
<span class="line"><span style="color:#babed8;">  // 获取函数需要的参数长度</span></span>
<span class="line"><span style="color:#babed8;">  let length = fn.length;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  args = args || [];</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  return function() {</span></span>
<span class="line"><span style="color:#babed8;">    let subArgs = args.slice(0);</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    // 拼接得到现有的所有参数</span></span>
<span class="line"><span style="color:#babed8;">    for (let i = 0; i &lt; arguments.length; i++) {</span></span>
<span class="line"><span style="color:#babed8;">      subArgs.push(arguments[i]);</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    // 判断参数的长度是否已经满足函数所需参数的长度</span></span>
<span class="line"><span style="color:#babed8;">    if (subArgs.length &gt;= length) {</span></span>
<span class="line"><span style="color:#babed8;">      // 如果满足，执行函数</span></span>
<span class="line"><span style="color:#babed8;">      return fn.apply(this, subArgs);</span></span>
<span class="line"><span style="color:#babed8;">    } else {</span></span>
<span class="line"><span style="color:#babed8;">      // 如果不满足，递归返回科里化的函数，等待参数的传入</span></span>
<span class="line"><span style="color:#babed8;">      return curry.call(this, fn, subArgs);</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">  };</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">// es6 实现</span></span>
<span class="line"><span style="color:#babed8;">function curry(fn, ...args) {</span></span>
<span class="line"><span style="color:#babed8;">  return fn.length &lt;= args.length ? fn(...args) : curry.bind(null, fn, ...args);</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><h3 id="_15-实现ajax请求" tabindex="-1">15. 实现AJAX请求 <a class="header-anchor" href="#_15-实现ajax请求" aria-label="Permalink to &quot;15. 实现AJAX请求&quot;">​</a></h3><p>AJAX是 Asynchronous JavaScript and XML 的缩写，指的是通过 JavaScript 的 异步通信，从服务器获取 XML 文档从中提取数据，再更新当前网页的对应部分，而不用刷新整个网页。</p><p>创建AJAX请求的步骤：</p><ul><li><strong>创建一个 XMLHttpRequest 对象。</strong></li><li>在这个对象上<strong>使用 open 方法创建一个 HTTP 请求</strong>，open 方法所需要的参数是请求的方法、请求的地址、是否异步和用户的认证信息。</li><li>在发起请求前，可以为这个对象<strong>添加一些信息和监听函数</strong>。比如说可以通过 setRequestHeader 方法来为请求添加头信息。还可以为这个对象添加一个状态监听函数。一个 XMLHttpRequest 对象一共有 5 个状态，当它的状态变化时会触发onreadystatechange 事件，可以通过设置监听函数，来处理请求成功后的结果。当对象的 readyState 变为 4 的时候，代表服务器返回的数据接收完成，这个时候可以通过判断请求的状态，如果状态是 2xx 或者 304 的话则代表返回正常。这个时候就可以通过 response 中的数据来对页面进行更新了。</li><li>当对象的属性和监听函数设置完成后，最后调<strong>用 send 方法来向服务器发起请求</strong>，可以传入参数作为发送的数据体。</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">const SERVER_URL = &quot;/server&quot;;</span></span>
<span class="line"><span style="color:#babed8;">let xhr = new XMLHttpRequest();</span></span>
<span class="line"><span style="color:#babed8;">// 创建 Http 请求</span></span>
<span class="line"><span style="color:#babed8;">xhr.open(&quot;GET&quot;, SERVER_URL, true);</span></span>
<span class="line"><span style="color:#babed8;">// 设置状态监听函数</span></span>
<span class="line"><span style="color:#babed8;">xhr.onreadystatechange = function() {</span></span>
<span class="line"><span style="color:#babed8;">  if (this.readyState !== 4) return;</span></span>
<span class="line"><span style="color:#babed8;">  // 当请求成功时</span></span>
<span class="line"><span style="color:#babed8;">  if (this.status === 200) {</span></span>
<span class="line"><span style="color:#babed8;">    handle(this.response);</span></span>
<span class="line"><span style="color:#babed8;">  } else {</span></span>
<span class="line"><span style="color:#babed8;">    console.error(this.statusText);</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">};</span></span>
<span class="line"><span style="color:#babed8;">// 设置请求失败时的监听函数</span></span>
<span class="line"><span style="color:#babed8;">xhr.onerror = function() {</span></span>
<span class="line"><span style="color:#babed8;">  console.error(this.statusText);</span></span>
<span class="line"><span style="color:#babed8;">};</span></span>
<span class="line"><span style="color:#babed8;">// 设置请求头信息</span></span>
<span class="line"><span style="color:#babed8;">xhr.responseType = &quot;json&quot;;</span></span>
<span class="line"><span style="color:#babed8;">xhr.setRequestHeader(&quot;Accept&quot;, &quot;application/json&quot;);</span></span>
<span class="line"><span style="color:#babed8;">// 发送 Http 请求</span></span>
<span class="line"><span style="color:#babed8;">xhr.send(null);</span></span></code></pre></div><h3 id="_16-使用promise封装ajax请求" tabindex="-1">16. 使用Promise封装AJAX请求 <a class="header-anchor" href="#_16-使用promise封装ajax请求" aria-label="Permalink to &quot;16. 使用Promise封装AJAX请求&quot;">​</a></h3><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// promise 封装实现：</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">getJSON</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">url</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 创建一个 promise 对象</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">promise</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">Promise</span><span style="color:#F07178;">(</span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">resolve</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#BABED8;font-style:italic;">reject</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">xhr</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">XMLHttpRequest</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 新建一个 http 请求</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#BABED8;">xhr</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">open</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">GET</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">url</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 设置状态的监听函数</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#BABED8;">xhr</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">onreadystatechange</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">this.</span><span style="color:#BABED8;">readyState</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">!==</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">4</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">// 当请求成功或失败时，改变 promise 的状态</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">this.</span><span style="color:#BABED8;">status</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">200</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#82AAFF;">resolve</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">this.</span><span style="color:#BABED8;">response</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">else</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#82AAFF;">reject</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">Error</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">this.</span><span style="color:#BABED8;">statusText</span><span style="color:#F07178;">))</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 设置错误监听函数</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#BABED8;">xhr</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">onerror</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#82AAFF;">reject</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">Error</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">this.</span><span style="color:#BABED8;">statusText</span><span style="color:#F07178;">))</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 设置响应的数据类型</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#BABED8;">xhr</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">responseType</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">json</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 设置请求头信息</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#BABED8;">xhr</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">setRequestHeader</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Accept</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">application/json</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 发送 http 请求</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#BABED8;">xhr</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">send</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">null</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">promise</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h3 id="_17-实现浅拷贝" tabindex="-1">17. 实现浅拷贝 <a class="header-anchor" href="#_17-实现浅拷贝" aria-label="Permalink to &quot;17. 实现浅拷贝&quot;">​</a></h3><p>浅拷贝是指，一个新的对象对原始对象的属性值进行精确地拷贝，如果拷贝的是基本数据类型，拷贝的就是基本数据类型的值，如果是引用数据类型，拷贝的就是内存地址。如果其中一个对象的引用内存地址发生改变，另一个对象也会发生变化。</p><h4 id="_1-object-assign" tabindex="-1">（1）Object.assign() <a class="header-anchor" href="#_1-object-assign" aria-label="Permalink to &quot;（1）Object.assign()&quot;">​</a></h4><p><code>Object.assign()</code>是ES6中对象的拷贝方法，接受的第一个参数是目标对象，其余参数是源对象，用法：<code>Object.assign(target, source_1, ···)</code>，该方法可以实现浅拷贝，也可以实现一维对象的深拷贝。</p><p><strong>注意：</strong></p><ul><li>如果目标对象和源对象有同名属性，或者多个源对象有同名属性，则后面的属性会覆盖前面的属性。</li><li>如果该函数只有一个参数，当参数为对象时，直接返回该对象；当参数不是对象时，会先将参数转为对象然后返回。</li><li>因为<code>null</code> 和 <code>undefined</code> 不能转化为对象，所以第一个参数不能为<code>null</code>或 <code>undefined</code>，会报错。</li></ul><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">let</span><span style="color:#BABED8;"> target </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#BABED8;"> object2 </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;">b</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#BABED8;"> object3 </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;">c</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#BABED8;">Object</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">assign</span><span style="color:#BABED8;">(target</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;">object2</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;">object3)</span><span style="color:#89DDFF;">;</span><span style="color:#BABED8;">  </span></span>
<span class="line"><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#BABED8;">(target)</span><span style="color:#89DDFF;">;</span><span style="color:#BABED8;">  </span><span style="color:#676E95;font-style:italic;">// {a: 1, b: 2, c: 3}</span></span></code></pre></div><h4 id="_2-扩展运算符" tabindex="-1">（2）扩展运算符 <a class="header-anchor" href="#_2-扩展运算符" aria-label="Permalink to &quot;（2）扩展运算符&quot;">​</a></h4><p>使用扩展运算符可以在构造字面量对象的时候，进行属性的拷贝。语法：<code>let cloneObj = { ...obj };</code></p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">let</span><span style="color:#BABED8;"> obj1 </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;">a</span><span style="color:#89DDFF;">:</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;">b</span><span style="color:#89DDFF;">:{</span><span style="color:#F07178;">c</span><span style="color:#89DDFF;">:</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">}}</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#BABED8;"> obj2 </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{...</span><span style="color:#BABED8;">obj1</span><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#BABED8;">obj1</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">a </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#BABED8;">(obj1)</span><span style="color:#89DDFF;">;</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;">//{a:2,b:{c:1}}</span></span>
<span class="line"><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#BABED8;">(obj2)</span><span style="color:#89DDFF;">;</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;">//{a:1,b:{c:1}}</span></span>
<span class="line"><span style="color:#BABED8;">obj1</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">b</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">c </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#BABED8;">(obj1)</span><span style="color:#89DDFF;">;</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;">//{a:2,b:{c:2}}</span></span>
<span class="line"><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#BABED8;">(obj2)</span><span style="color:#89DDFF;">;</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;">//{a:1,b:{c:2}}</span></span></code></pre></div><h4 id="_3-数组方法实现数组浅拷贝" tabindex="-1">（3）数组方法实现数组浅拷贝 <a class="header-anchor" href="#_3-数组方法实现数组浅拷贝" aria-label="Permalink to &quot;（3）数组方法实现数组浅拷贝&quot;">​</a></h4><h6 id="_1-array-prototype-slice" tabindex="-1"><strong>1）Array.prototype.slice</strong> <a class="header-anchor" href="#_1-array-prototype-slice" aria-label="Permalink to &quot;**1）Array.prototype.slice**&quot;">​</a></h6><ul><li><code>slice()</code>方法是JavaScript数组的一个方法，这个方法可以从已有数组中返回选定的元素：用法：<code>array.slice(start, end)</code>，该方法不会改变原始数组。</li><li>该方法有两个参数，两个参数都可选，如果两个参数都不写，就可以实现一个数组的浅拷贝。</li></ul><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">let</span><span style="color:#BABED8;"> arr </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> [</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">4</span><span style="color:#BABED8;">]</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#BABED8;">(arr</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">slice</span><span style="color:#BABED8;">())</span><span style="color:#89DDFF;">;</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;">// [1,2,3,4]</span></span>
<span class="line"><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#BABED8;">(arr</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">slice</span><span style="color:#BABED8;">() </span><span style="color:#89DDFF;">===</span><span style="color:#BABED8;"> arr)</span><span style="color:#89DDFF;">;</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;">//false</span></span></code></pre></div><h6 id="_2-array-prototype-concat" tabindex="-1"><strong>2）Array.prototype.concat</strong> <a class="header-anchor" href="#_2-array-prototype-concat" aria-label="Permalink to &quot;**2）Array.prototype.concat**&quot;">​</a></h6><ul><li><code>concat()</code> 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。</li><li>该方法有两个参数，两个参数都可选，如果两个参数都不写，就可以实现一个数组的浅拷贝。</li></ul><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">let</span><span style="color:#BABED8;"> arr </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> [</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">4</span><span style="color:#BABED8;">]</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#BABED8;">(arr</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">concat</span><span style="color:#BABED8;">())</span><span style="color:#89DDFF;">;</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;">// [1,2,3,4]</span></span>
<span class="line"><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#BABED8;">(arr</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">concat</span><span style="color:#BABED8;">() </span><span style="color:#89DDFF;">===</span><span style="color:#BABED8;"> arr)</span><span style="color:#89DDFF;">;</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;">//false</span></span></code></pre></div><h4 id="_4-手写实现浅拷贝" tabindex="-1">（4）手写实现浅拷贝 <a class="header-anchor" href="#_4-手写实现浅拷贝" aria-label="Permalink to &quot;（4）手写实现浅拷贝&quot;">​</a></h4><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 浅拷贝的实现;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">shallowCopy</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">object</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 只拷贝对象</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">!</span><span style="color:#BABED8;">object</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">||</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">typeof</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">object</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">!==</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">object</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 根据 object 的类型判断是新建一个数组还是对象</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">newObject</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">Array</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">isArray</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">object</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">?</span><span style="color:#F07178;"> [] </span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 遍历 object，并且判断是 object 的属性才拷贝</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#F07178;"> (</span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">key</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">in</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">object</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#BABED8;">object</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">hasOwnProperty</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">key</span><span style="color:#F07178;">)) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#BABED8;">newObject</span><span style="color:#F07178;">[</span><span style="color:#BABED8;">key</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">object</span><span style="color:#F07178;">[</span><span style="color:#BABED8;">key</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">newObject</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#676E95;font-style:italic;">// 浅拷贝的实现;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">shallowCopy</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">object</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 只拷贝对象</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">!</span><span style="color:#BABED8;">object</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">||</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">typeof</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">object</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">!==</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">object</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 根据 object 的类型判断是新建一个数组还是对象</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">newObject</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">Array</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">isArray</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">object</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">?</span><span style="color:#F07178;"> [] </span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 遍历 object，并且判断是 object 的属性才拷贝</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#F07178;"> (</span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">key</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">in</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">object</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#BABED8;">object</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">hasOwnProperty</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">key</span><span style="color:#F07178;">)) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#BABED8;">newObject</span><span style="color:#F07178;">[</span><span style="color:#BABED8;">key</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">object</span><span style="color:#F07178;">[</span><span style="color:#BABED8;">key</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">newObject</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#676E95;font-style:italic;">// 浅拷贝的实现;</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">shallowCopy</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">object</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 只拷贝对象</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">!</span><span style="color:#BABED8;">object</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">||</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">typeof</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">object</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">!==</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">object</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 根据 object 的类型判断是新建一个数组还是对象</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">newObject</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">Array</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">isArray</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">object</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">?</span><span style="color:#F07178;"> [] </span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{};</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 遍历 object，并且判断是 object 的属性才拷贝</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#F07178;"> (</span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">key</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">in</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">object</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#BABED8;">object</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">hasOwnProperty</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">key</span><span style="color:#F07178;">)) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#BABED8;">newObject</span><span style="color:#F07178;">[</span><span style="color:#BABED8;">key</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">object</span><span style="color:#F07178;">[</span><span style="color:#BABED8;">key</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">newObject</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h3 id="_18-实现深拷贝" tabindex="-1">18. 实现深拷贝 <a class="header-anchor" href="#_18-实现深拷贝" aria-label="Permalink to &quot;18. 实现深拷贝&quot;">​</a></h3><ul><li>**浅拷贝：**浅拷贝指的是将一个对象的属性值复制到另一个对象，如果有的属性的值为引用类型的话，那么会将这个引用的地址复制给对象，因此两个对象会有同一个引用类型的引用。浅拷贝可以使用 Object.assign 和展开运算符来实现。</li><li>**深拷贝：**深拷贝相对浅拷贝而言，如果遇到属性值为引用类型的时候，它新建一个引用类型并将对应的值复制给它，因此对象获得的一个新的引用类型而不是一个原有类型的引用。深拷贝对于一些对象可以使用 JSON 的两个函数来实现，但是由于 JSON 的对象格式比 js 的对象格式更加严格，所以如果属性值里边出现函数或者 Symbol 类型的值时，会转换失败</li></ul><h4 id="_1-json-stringify" tabindex="-1">（1）JSON.stringify() <a class="header-anchor" href="#_1-json-stringify" aria-label="Permalink to &quot;（1）JSON.stringify()&quot;">​</a></h4><ul><li><code>JSON.parse(JSON.stringify(obj))</code>是目前比较常用的深拷贝方法之一，它的原理就是利用<code>JSON.stringify</code> 将<code>js</code>对象序列化（JSON字符串），再使用<code>JSON.parse</code>来反序列化(还原)<code>js</code>对象。</li><li>这个方法可以简单粗暴的实现深拷贝，但是还存在问题，拷贝的对象中如果有函数，undefined，symbol，当使用过<code>JSON.stringify()</code>进行处理之后，都会消失。</li></ul><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">let</span><span style="color:#BABED8;"> obj1 </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#BABED8;">  </span><span style="color:#F07178;">a</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">              </span><span style="color:#F07178;">b</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">                 </span><span style="color:#F07178;">c</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">0</span></span>
<span class="line"><span style="color:#BABED8;">                 </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#BABED8;">            </span><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#BABED8;"> obj2 </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> JSON</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">parse</span><span style="color:#BABED8;">(JSON</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">stringify</span><span style="color:#BABED8;">(obj1))</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#BABED8;">obj1</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">a </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#BABED8;">obj1</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">b</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">c </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#BABED8;">(obj1)</span><span style="color:#89DDFF;">;</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;">// {a: 1, b: {c: 1}}</span></span>
<span class="line"><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#BABED8;">(obj2)</span><span style="color:#89DDFF;">;</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;">// {a: 0, b: {c: 0}}</span></span></code></pre></div><h4 id="_2-函数库lodash的-clonedeep方法" tabindex="-1">（2）函数库lodash的_.cloneDeep方法 <a class="header-anchor" href="#_2-函数库lodash的-clonedeep方法" aria-label="Permalink to &quot;（2）函数库lodash的_.cloneDeep方法&quot;">​</a></h4><p>该函数库也有提供_.cloneDeep用来做 Deep Copy</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#BABED8;"> _ </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">require</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">lodash</span><span style="color:#89DDFF;">&#39;</span><span style="color:#BABED8;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#BABED8;"> obj1 </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#F07178;">a</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#F07178;">b</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#BABED8;"> </span><span style="color:#F07178;">f</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#BABED8;"> </span><span style="color:#F07178;">g</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">1</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#F07178;">c</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> [</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">3</span><span style="color:#BABED8;">]</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#BABED8;"> obj2 </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> _</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">cloneDeep</span><span style="color:#BABED8;">(obj1)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#BABED8;">(obj1</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">b</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">f </span><span style="color:#89DDFF;">===</span><span style="color:#BABED8;"> obj2</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">b</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">f)</span><span style="color:#89DDFF;">;</span><span style="color:#676E95;font-style:italic;">// false</span></span></code></pre></div><h4 id="_3-手写实现深拷贝函数" tabindex="-1">（3）手写实现深拷贝函数 <a class="header-anchor" href="#_3-手写实现深拷贝函数" aria-label="Permalink to &quot;（3）手写实现深拷贝函数&quot;">​</a></h4><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 深拷贝的实现</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">deepCopy</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">object</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">!</span><span style="color:#BABED8;">object</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">||</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">typeof</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">object</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">!==</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">object</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">newObject</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">Array</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">isArray</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">object</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">?</span><span style="color:#F07178;"> [] </span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#F07178;"> (</span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">key</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">in</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">object</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#BABED8;">object</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">hasOwnProperty</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">key</span><span style="color:#F07178;">)) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#BABED8;">newObject</span><span style="color:#F07178;">[</span><span style="color:#BABED8;">key</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">=</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">typeof</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">object</span><span style="color:#F07178;">[</span><span style="color:#BABED8;">key</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">object</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">?</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">deepCopy</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">object</span><span style="color:#F07178;">[</span><span style="color:#BABED8;">key</span><span style="color:#F07178;">]) </span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">object</span><span style="color:#F07178;">[</span><span style="color:#BABED8;">key</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">newObject</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h2 id="二、数据处理" tabindex="-1">二、数据处理 <a class="header-anchor" href="#二、数据处理" aria-label="Permalink to &quot;二、数据处理&quot;">​</a></h2><h3 id="_1-实现日期格式化函数" tabindex="-1">1. 实现日期格式化函数 <a class="header-anchor" href="#_1-实现日期格式化函数" aria-label="Permalink to &quot;1. 实现日期格式化函数&quot;">​</a></h3><p>输入：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">dateFormat(new Date(&#39;2020-12-01&#39;), &#39;yyyy/MM/dd&#39;) // 2020/12/01</span></span>
<span class="line"><span style="color:#babed8;">dateFormat(new Date(&#39;2020-04-01&#39;), &#39;yyyy/MM/dd&#39;) // 2020/04/01</span></span>
<span class="line"><span style="color:#babed8;">dateFormat(new Date(&#39;2020-04-01&#39;), &#39;yyyy年MM月dd日&#39;) // 2020年04月01日</span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">const dateFormat = (dateInput, format)=&gt;{</span></span>
<span class="line"><span style="color:#babed8;">    var day = dateInput.getDate() </span></span>
<span class="line"><span style="color:#babed8;">    var month = dateInput.getMonth() + 1  </span></span>
<span class="line"><span style="color:#babed8;">    var year = dateInput.getFullYear()   </span></span>
<span class="line"><span style="color:#babed8;">    format = format.replace(/yyyy/, year)</span></span>
<span class="line"><span style="color:#babed8;">    format = format.replace(/MM/,month)</span></span>
<span class="line"><span style="color:#babed8;">    format = format.replace(/dd/,day)</span></span>
<span class="line"><span style="color:#babed8;">    return format</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><h3 id="_2-交换a-b的值-不能用临时变量" tabindex="-1">2. 交换a,b的值，不能用临时变量 <a class="header-anchor" href="#_2-交换a-b的值-不能用临时变量" aria-label="Permalink to &quot;2. 交换a,b的值，不能用临时变量&quot;">​</a></h3><p>巧妙的利用两个数的和、差：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">a = a + b</span></span>
<span class="line"><span style="color:#babed8;">b = a - b</span></span>
<span class="line"><span style="color:#babed8;">a = a - b</span></span></code></pre></div><h3 id="_3-实现数组的乱序输出" tabindex="-1">3. 实现数组的乱序输出 <a class="header-anchor" href="#_3-实现数组的乱序输出" aria-label="Permalink to &quot;3. 实现数组的乱序输出&quot;">​</a></h3><p>主要的实现思路就是：</p><ul><li>取出数组的第一个元素，随机产生一个索引值，将该第一个元素和这个索引对应的元素进行交换。</li><li>第二次取出数据数组第二个元素，随机产生一个除了索引为1的之外的索引值，并将第二个元素与该索引值对应的元素进行交换</li><li>按照上面的规律执行，直到遍历完成</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">var arr = [1,2,3,4,5,6,7,8,9,10];</span></span>
<span class="line"><span style="color:#babed8;">for (var i = 0; i &lt; arr.length; i++) {</span></span>
<span class="line"><span style="color:#babed8;">  const randomIndex = Math.round(Math.random() * (arr.length - 1 - i)) + i;</span></span>
<span class="line"><span style="color:#babed8;">  [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">console.log(arr)</span></span></code></pre></div><p>还有一方法就是倒序遍历：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">var arr = [1,2,3,4,5,6,7,8,9,10];</span></span>
<span class="line"><span style="color:#babed8;">let length = arr.length,</span></span>
<span class="line"><span style="color:#babed8;">    randomIndex,</span></span>
<span class="line"><span style="color:#babed8;">    temp;</span></span>
<span class="line"><span style="color:#babed8;">  while (length) {</span></span>
<span class="line"><span style="color:#babed8;">    randomIndex = Math.floor(Math.random() * length--);</span></span>
<span class="line"><span style="color:#babed8;">    temp = arr[length];</span></span>
<span class="line"><span style="color:#babed8;">    arr[length] = arr[randomIndex];</span></span>
<span class="line"><span style="color:#babed8;">    arr[randomIndex] = temp;</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">console.log(arr)</span></span></code></pre></div><h3 id="_4-实现数组元素求和" tabindex="-1">4. 实现数组元素求和 <a class="header-anchor" href="#_4-实现数组元素求和" aria-label="Permalink to &quot;4. 实现数组元素求和&quot;">​</a></h3><ul><li>arr=[1,2,3,4,5,6,7,8,9,10]，求和</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">let arr=[1,2,3,4,5,6,7,8,9,10]</span></span>
<span class="line"><span style="color:#babed8;">let sum = arr.reduce( (total,i) =&gt; total += i,0);</span></span>
<span class="line"><span style="color:#babed8;">console.log(sum);</span></span></code></pre></div><ul><li>arr=[1,2,3,[[4,5],6],7,8,9]，求和</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">var = arr=[1,2,3,[[4,5],6],7,8,9]</span></span>
<span class="line"><span style="color:#babed8;">let arr= arr.toString().split(&#39;,&#39;).reduce( (total,i) =&gt; total += Number(i),0);</span></span>
<span class="line"><span style="color:#babed8;">console.log(arr);</span></span></code></pre></div><p>递归实现：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">let arr = [1, 2, 3, 4, 5, 6] </span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">function add(arr) {</span></span>
<span class="line"><span style="color:#babed8;">    if (arr.length == 1) return arr[0] </span></span>
<span class="line"><span style="color:#babed8;">    return arr[0] + add(arr.slice(1)) </span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">console.log(add(arr)) // 21</span></span></code></pre></div><h3 id="_5-实现数组的扁平化" tabindex="-1">5. 实现数组的扁平化 <a class="header-anchor" href="#_5-实现数组的扁平化" aria-label="Permalink to &quot;5. 实现数组的扁平化&quot;">​</a></h3><p><strong>（1）递归实现</strong></p><p>普通的递归思路很容易理解，就是通过循环递归的方式，一项一项地去遍历，如果每一项还是一个数组，那么就继续往下遍历，利用递归程序的方法，来实现数组的每一项的连接：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">let arr = [1, [2, [3, 4, 5]]];</span></span>
<span class="line"><span style="color:#babed8;">function flatten(arr) {</span></span>
<span class="line"><span style="color:#babed8;">  let result = [];</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  for(let i = 0; i &lt; arr.length; i++) {</span></span>
<span class="line"><span style="color:#babed8;">    if(Array.isArray(arr[i])) {</span></span>
<span class="line"><span style="color:#babed8;">      result = result.concat(flatten(arr[i]));</span></span>
<span class="line"><span style="color:#babed8;">    } else {</span></span>
<span class="line"><span style="color:#babed8;">      result.push(arr[i]);</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">  return result;</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">flatten(arr);  //  [1, 2, 3, 4，5]</span></span></code></pre></div><p><strong>（2）reduce 函数迭代</strong></p><p>从上面普通的递归函数中可以看出，其实就是对数组的每一项进行处理，那么其实也可以用reduce 来实现数组的拼接，从而简化第一种方法的代码，改造后的代码如下所示：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">let arr = [1, [2, [3, 4]]];</span></span>
<span class="line"><span style="color:#babed8;">function flatten(arr) {</span></span>
<span class="line"><span style="color:#babed8;">    return arr.reduce(function(prev, next){</span></span>
<span class="line"><span style="color:#babed8;">        return prev.concat(Array.isArray(next) ? flatten(next) : next)</span></span>
<span class="line"><span style="color:#babed8;">    }, [])</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">console.log(flatten(arr));//  [1, 2, 3, 4，5]</span></span></code></pre></div><p><strong>（3）扩展运算符实现</strong></p><p>这个方法的实现，采用了扩展运算符和 some 的方法，两者共同使用，达到数组扁平化的目的：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">let arr = [1, [2, [3, 4]]];</span></span>
<span class="line"><span style="color:#babed8;">function flatten(arr) {</span></span>
<span class="line"><span style="color:#babed8;">    while (arr.some(item =&gt; Array.isArray(item))) {</span></span>
<span class="line"><span style="color:#babed8;">        arr = [].concat(...arr);</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">    return arr;</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">console.log(flatten(arr)); //  [1, 2, 3, 4，5]</span></span></code></pre></div><p><strong>（4）split 和 toString</strong></p><p>可以通过 split 和 toString 两个方法来共同实现数组扁平化，由于数组会默认带一个 toString 的方法，所以可以把数组直接转换成逗号分隔的字符串，然后再用 split 方法把字符串重新转换为数组，如下面的代码所示：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">let arr = [1, [2, [3, 4]]];</span></span>
<span class="line"><span style="color:#babed8;">function flatten(arr) {</span></span>
<span class="line"><span style="color:#babed8;">    return arr.toString().split(&#39;,&#39;);</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">console.log(flatten(arr)); //  [1, 2, 3, 4，5]</span></span></code></pre></div><p>通过这两个方法可以将多维数组直接转换成逗号连接的字符串，然后再重新分隔成数组。</p><p>**（5）**<strong>ES6 中的 flat</strong></p><p>我们还可以直接调用 ES6 中的 flat 方法来实现数组扁平化。flat 方法的语法：<code>arr.flat([depth])</code></p><p>其中 depth 是 flat 的参数，depth 是可以传递数组的展开深度（默认不填、数值是 1），即展开一层数组。如果层数不确定，参数可以传进 Infinity，代表不论多少层都要展开：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">let arr = [1, [2, [3, 4]]];</span></span>
<span class="line"><span style="color:#babed8;">function flatten(arr) {</span></span>
<span class="line"><span style="color:#babed8;">  return arr.flat(Infinity);</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">console.log(flatten(arr)); //  [1, 2, 3, 4，5]</span></span></code></pre></div><p>可以看出，一个嵌套了两层的数组，通过将 flat 方法的参数设置为 Infinity，达到了我们预期的效果。其实同样也可以设置成 2，也能实现这样的效果。在编程过程中，如果数组的嵌套层数不确定，最好直接使用 Infinity，可以达到扁平化。</p><p><strong>（6）正则和 JSON 方法</strong></p><p>在第4种方法中已经使用 toString 方法，其中仍然采用了将 JSON.stringify 的方法先转换为字符串，然后通过正则表达式过滤掉字符串中的数组的方括号，最后再利用 JSON.parse 把它转换成数组：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">let arr = [1, [2, [3, [4, 5]]], 6];</span></span>
<span class="line"><span style="color:#babed8;">function flatten(arr) {</span></span>
<span class="line"><span style="color:#babed8;">  let str = JSON.stringify(arr);</span></span>
<span class="line"><span style="color:#babed8;">  str = str.replace(/(\\[|\\])/g, &#39;&#39;);</span></span>
<span class="line"><span style="color:#babed8;">  str = &#39;[&#39; + str + &#39;]&#39;;</span></span>
<span class="line"><span style="color:#babed8;">  return JSON.parse(str); </span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">console.log(flatten(arr)); //  [1, 2, 3, 4，5]</span></span></code></pre></div><h3 id="_6-实现数组去重" tabindex="-1">6. 实现数组去重 <a class="header-anchor" href="#_6-实现数组去重" aria-label="Permalink to &quot;6. 实现数组去重&quot;">​</a></h3><p>给定某无序数组，要求去除数组中的重复数字并且返回新的无重复数组。</p><p>ES6方法（使用数据结构集合）：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">const array = [1, 2, 3, 5, 1, 5, 9, 1, 2, 8];</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">Array.from(new Set(array)); // [1, 2, 3, 5, 9, 8]</span></span></code></pre></div><p>ES5方法：使用map存储不重复的数字</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">const array = [1, 2, 3, 5, 1, 5, 9, 1, 2, 8];</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">uniqueArray(array); // [1, 2, 3, 5, 9, 8]</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">function uniqueArray(array) {</span></span>
<span class="line"><span style="color:#babed8;">  let map = {};</span></span>
<span class="line"><span style="color:#babed8;">  let res = [];</span></span>
<span class="line"><span style="color:#babed8;">  for(var i = 0; i &lt; array.length; i++) {</span></span>
<span class="line"><span style="color:#babed8;">    if(!map.hasOwnProperty([array[i]])) {</span></span>
<span class="line"><span style="color:#babed8;">      map[array[i]] = 1;</span></span>
<span class="line"><span style="color:#babed8;">      res.push(array[i]);</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">  return res;</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><h3 id="_7-实现数组的flat方法" tabindex="-1">7. 实现数组的flat方法 <a class="header-anchor" href="#_7-实现数组的flat方法" aria-label="Permalink to &quot;7. 实现数组的flat方法&quot;">​</a></h3><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">_flat</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">arr</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#BABED8;font-style:italic;">depth</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">!</span><span style="color:#BABED8;">Array</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">isArray</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">arr</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">||</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">depth</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">arr</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">arr</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">reduce</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">prev</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#BABED8;font-style:italic;">cur</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#BABED8;">Array</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">isArray</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">cur</span><span style="color:#F07178;">)) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">prev</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">concat</span><span style="color:#F07178;">(</span><span style="color:#82AAFF;">_flat</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">cur</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">depth</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">-</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#F07178;">))</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">else</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">prev</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">concat</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">cur</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span><span style="color:#F07178;"> [])</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h3 id="_8-实现数组的push方法" tabindex="-1">8. 实现数组的push方法 <a class="header-anchor" href="#_8-实现数组的push方法" aria-label="Permalink to &quot;8. 实现数组的push方法&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">let arr = [];</span></span>
<span class="line"><span style="color:#babed8;">Array.prototype.push = function() {</span></span>
<span class="line"><span style="color:#babed8;">    for( let i = 0 ; i &lt; arguments.length ; i++){</span></span>
<span class="line"><span style="color:#babed8;">        this[this.length] = arguments[i] ;</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">    return this.length;</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><h3 id="_9-实现数组的filter方法" tabindex="-1">9. 实现数组的filter方法 <a class="header-anchor" href="#_9-实现数组的filter方法" aria-label="Permalink to &quot;9. 实现数组的filter方法&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">Array.prototype._filter = function(fn) {</span></span>
<span class="line"><span style="color:#babed8;">    if (typeof fn !== &quot;function&quot;) {</span></span>
<span class="line"><span style="color:#babed8;">        throw Error(&#39;参数必须是一个函数&#39;);</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">    const res = [];</span></span>
<span class="line"><span style="color:#babed8;">    for (let i = 0, len = this.length; i &lt; len; i++) {</span></span>
<span class="line"><span style="color:#babed8;">        fn(this[i]) &amp;&amp; res.push(this[i]);</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">    return res;</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><h3 id="_10-实现数组的map方法" tabindex="-1">10. 实现数组的map方法 <a class="header-anchor" href="#_10-实现数组的map方法" aria-label="Permalink to &quot;10. 实现数组的map方法&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">Array.prototype._map = function(fn) {</span></span>
<span class="line"><span style="color:#babed8;">   if (typeof fn !== &quot;function&quot;) {</span></span>
<span class="line"><span style="color:#babed8;">        throw Error(&#39;参数必须是一个函数&#39;);</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">    const res = [];</span></span>
<span class="line"><span style="color:#babed8;">    for (let i = 0, len = this.length; i &lt; len; i++) {</span></span>
<span class="line"><span style="color:#babed8;">        res.push(fn(this[i]));</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">    return res;</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><h3 id="_11-实现字符串的repeat方法" tabindex="-1">11. 实现字符串的repeat方法 <a class="header-anchor" href="#_11-实现字符串的repeat方法" aria-label="Permalink to &quot;11. 实现字符串的repeat方法&quot;">​</a></h3><p>输入字符串s，以及其重复的次数，输出重复的结果，例如输入abc，2，输出abcabc。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">function repeat(s, n) {</span></span>
<span class="line"><span style="color:#babed8;">    return (new Array(n + 1)).join(s);</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><p>递归：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">function repeat(s, n) {</span></span>
<span class="line"><span style="color:#babed8;">    return (n &gt; 0) ? s.concat(repeat(s, --n)) : &quot;&quot;;</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><h3 id="_12-实现字符串翻转" tabindex="-1">12. 实现字符串翻转 <a class="header-anchor" href="#_12-实现字符串翻转" aria-label="Permalink to &quot;12. 实现字符串翻转&quot;">​</a></h3><p>在字符串的原型链上添加一个方法，实现字符串翻转：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">String.prototype._reverse = function(a){</span></span>
<span class="line"><span style="color:#babed8;">    return a.split(&quot;&quot;).reverse().join(&quot;&quot;);</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">var obj = new String();</span></span>
<span class="line"><span style="color:#babed8;">var res = obj._reverse (&#39;hello&#39;);</span></span>
<span class="line"><span style="color:#babed8;">console.log(res);    // olleh</span></span></code></pre></div><p>需要注意的是，必须通过实例化对象之后再去调用定义的方法，不然找不到该方法。</p><h3 id="_13-将数字每千分位用逗号隔开" tabindex="-1">13. 将数字每千分位用逗号隔开 <a class="header-anchor" href="#_13-将数字每千分位用逗号隔开" aria-label="Permalink to &quot;13. 将数字每千分位用逗号隔开&quot;">​</a></h3><p><strong>数字有小数版本：</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">let format = n =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">    let num = n.toString() // 转成字符串</span></span>
<span class="line"><span style="color:#babed8;">    let decimals = &#39;&#39;</span></span>
<span class="line"><span style="color:#babed8;">        // 判断是否有小数</span></span>
<span class="line"><span style="color:#babed8;">    num.indexOf(&#39;.&#39;) &gt; -1 ? decimals = num.split(&#39;.&#39;)[1] : decimals</span></span>
<span class="line"><span style="color:#babed8;">    let len = num.length</span></span>
<span class="line"><span style="color:#babed8;">    if (len &lt;= 3) {</span></span>
<span class="line"><span style="color:#babed8;">        return num</span></span>
<span class="line"><span style="color:#babed8;">    } else {</span></span>
<span class="line"><span style="color:#babed8;">        let temp = &#39;&#39;</span></span>
<span class="line"><span style="color:#babed8;">        let remainder = len % 3</span></span>
<span class="line"><span style="color:#babed8;">        decimals ? temp = &#39;.&#39; + decimals : temp</span></span>
<span class="line"><span style="color:#babed8;">        if (remainder &gt; 0) { // 不是3的整数倍</span></span>
<span class="line"><span style="color:#babed8;">            return num.slice(0, remainder) + &#39;,&#39; + num.slice(remainder, len).match(/\\d{3}/g).join(&#39;,&#39;) + temp</span></span>
<span class="line"><span style="color:#babed8;">        } else { // 是3的整数倍</span></span>
<span class="line"><span style="color:#babed8;">            return num.slice(0, len).match(/\\d{3}/g).join(&#39;,&#39;) + temp </span></span>
<span class="line"><span style="color:#babed8;">        }</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">format(12323.33)  // &#39;12,323.33&#39;</span></span></code></pre></div><p><strong>数字无小数版本：</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">let format = n =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">    let num = n.toString() </span></span>
<span class="line"><span style="color:#babed8;">    let len = num.length</span></span>
<span class="line"><span style="color:#babed8;">    if (len &lt;= 3) {</span></span>
<span class="line"><span style="color:#babed8;">        return num</span></span>
<span class="line"><span style="color:#babed8;">    } else {</span></span>
<span class="line"><span style="color:#babed8;">        let remainder = len % 3</span></span>
<span class="line"><span style="color:#babed8;">        if (remainder &gt; 0) { // 不是3的整数倍</span></span>
<span class="line"><span style="color:#babed8;">            return num.slice(0, remainder) + &#39;,&#39; + num.slice(remainder, len).match(/\\d{3}/g).join(&#39;,&#39;) </span></span>
<span class="line"><span style="color:#babed8;">        } else { // 是3的整数倍</span></span>
<span class="line"><span style="color:#babed8;">            return num.slice(0, len).match(/\\d{3}/g).join(&#39;,&#39;) </span></span>
<span class="line"><span style="color:#babed8;">        }</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">format(1232323)  // &#39;1,232,323&#39;</span></span></code></pre></div><h3 id="_14-实现非负大整数相加" tabindex="-1">14. 实现非负大整数相加 <a class="header-anchor" href="#_14-实现非负大整数相加" aria-label="Permalink to &quot;14. 实现非负大整数相加&quot;">​</a></h3><p>JavaScript对数值有范围的限制，限制如下：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">Number.MAX_VALUE // 1.7976931348623157e+308</span></span>
<span class="line"><span style="color:#babed8;">Number.MAX_SAFE_INTEGER // 9007199254740991</span></span>
<span class="line"><span style="color:#babed8;">Number.MIN_VALUE // 5e-324</span></span>
<span class="line"><span style="color:#babed8;">Number.MIN_SAFE_INTEGER // -9007199254740991</span></span></code></pre></div><p>如果想要对一个超大的整数(<code>&gt; Number.MAX_SAFE_INTEGER</code>)进行加法运算，但是又想输出一般形式，那么使用 + 是无法达到的，一旦数字超过 <code>Number.MAX_SAFE_INTEGER</code> 数字会被立即转换为科学计数法，并且数字精度相比以前将会有误差。</p><p>实现一个算法进行大数的相加：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">function sumBigNumber(a, b) {</span></span>
<span class="line"><span style="color:#babed8;">  let res = &#39;&#39;;</span></span>
<span class="line"><span style="color:#babed8;">  let temp = 0;</span></span>
<span class="line"><span style="color:#babed8;">  </span></span>
<span class="line"><span style="color:#babed8;">  a = a.split(&#39;&#39;);</span></span>
<span class="line"><span style="color:#babed8;">  b = b.split(&#39;&#39;);</span></span>
<span class="line"><span style="color:#babed8;">  </span></span>
<span class="line"><span style="color:#babed8;">  while (a.length || b.length || temp) {</span></span>
<span class="line"><span style="color:#babed8;">    temp += ~~a.pop() + ~~b.pop();</span></span>
<span class="line"><span style="color:#babed8;">    res = (temp % 10) + res;</span></span>
<span class="line"><span style="color:#babed8;">    temp  = temp &gt; 9</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">  return res.replace(/^0+/, &#39;&#39;);</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><p>其主要的思路如下：</p><ul><li>首先用字符串的方式来保存大数，这样数字在数学表示上就不会发生变化</li><li>初始化res，temp来保存中间的计算结果，并将两个字符串转化为数组，以便进行每一位的加法运算</li><li>将两个数组的对应的位进行相加，两个数相加的结果可能大于10，所以可能要进位，对10进行取余操作，将结果保存在当前位</li><li>判断当前位是否大于9，也就是是否会进位，若是则将temp赋值为true，因为在加法运算中，true会自动隐式转化为1，以便于下一次相加</li><li>重复上述操作，直至计算结束</li></ul><h3 id="_13-实现-add-1-2-3" tabindex="-1">13. 实现 add(1)(2)(3) <a class="header-anchor" href="#_13-实现-add-1-2-3" aria-label="Permalink to &quot;13. 实现 add(1)(2)(3)&quot;">​</a></h3><p>函数柯里化概念： 柯里化（Currying）是把接受多个参数的函数转变为接受一个单一参数的函数，并且返回接受余下的参数且返回结果的新函数的技术。</p><p>1）粗暴版</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">function add (a) {</span></span>
<span class="line"><span style="color:#babed8;">return function (b) {</span></span>
<span class="line"><span style="color:#babed8;">    return function (c) {</span></span>
<span class="line"><span style="color:#babed8;">      return a + b + c;</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">console.log(add(1)(2)(3)); // 6</span></span></code></pre></div><p>2）柯里化解决方案</p><ul><li>参数长度固定</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">var add = function (m) {</span></span>
<span class="line"><span style="color:#babed8;">  var temp = function (n) {</span></span>
<span class="line"><span style="color:#babed8;">    return add(m + n);</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">  temp.toString = function () {</span></span>
<span class="line"><span style="color:#babed8;">    return m;</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">  return temp;</span></span>
<span class="line"><span style="color:#babed8;">};</span></span>
<span class="line"><span style="color:#babed8;">console.log(add(3)(4)(5)); // 12</span></span>
<span class="line"><span style="color:#babed8;">console.log(add(3)(6)(9)(25)); // 43</span></span></code></pre></div><p>对于add(3)(4)(5)，其执行过程如下：</p><ol><li>先执行add(3)，此时m=3，并且返回temp函数；</li><li>执行temp(4)，这个函数内执行add(m+n)，n是此次传进来的数值4，m值还是上一步中的3，所以add(m+n)=add(3+4)=add(7)，此时m=7，并且返回temp函数</li><li>执行temp(5)，这个函数内执行add(m+n)，n是此次传进来的数值5，m值还是上一步中的7，所以add(m+n)=add(7+5)=add(12)，此时m=12，并且返回temp函数</li><li>由于后面没有传入参数，等于返回的temp函数不被执行而是打印，了解JS的朋友都知道对象的toString是修改对象转换字符串的方法，因此代码中temp函数的toString函数return m值，而m值是最后一步执行函数时的值m=12，所以返回值是12。</li></ol><ul><li>参数长度不固定</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">function add (...args) {</span></span>
<span class="line"><span style="color:#babed8;">    //求和</span></span>
<span class="line"><span style="color:#babed8;">    return args.reduce((a, b) =&gt; a + b)</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">function currying (fn) {</span></span>
<span class="line"><span style="color:#babed8;">    let args = []</span></span>
<span class="line"><span style="color:#babed8;">    return function temp (...newArgs) {</span></span>
<span class="line"><span style="color:#babed8;">        if (newArgs.length) {</span></span>
<span class="line"><span style="color:#babed8;">            args = [</span></span>
<span class="line"><span style="color:#babed8;">                ...args,</span></span>
<span class="line"><span style="color:#babed8;">                ...newArgs</span></span>
<span class="line"><span style="color:#babed8;">            ]</span></span>
<span class="line"><span style="color:#babed8;">            return temp</span></span>
<span class="line"><span style="color:#babed8;">        } else {</span></span>
<span class="line"><span style="color:#babed8;">            let val = fn.apply(this, args)</span></span>
<span class="line"><span style="color:#babed8;">            args = [] //保证再次调用时清空</span></span>
<span class="line"><span style="color:#babed8;">            return val</span></span>
<span class="line"><span style="color:#babed8;">        }</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">let addCurry = currying(add)</span></span>
<span class="line"><span style="color:#babed8;">console.log(addCurry(1)(2)(3)(4, 5)())  //15</span></span>
<span class="line"><span style="color:#babed8;">console.log(addCurry(1)(2)(3, 4, 5)())  //15</span></span>
<span class="line"><span style="color:#babed8;">console.log(addCurry(1)(2, 3, 4, 5)())  //15</span></span></code></pre></div><h3 id="_14-实现类数组转化为数组" tabindex="-1">14. 实现类数组转化为数组 <a class="header-anchor" href="#_14-实现类数组转化为数组" aria-label="Permalink to &quot;14. 实现类数组转化为数组&quot;">​</a></h3><p>类数组转换为数组的方法有这样几种：</p><ul><li>通过 call 调用数组的 slice 方法来实现转换</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">Array.prototype.slice.call(arrayLike);</span></span></code></pre></div><ul><li>通过 call 调用数组的 splice 方法来实现转换</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">Array.prototype.splice.call(arrayLike, 0);</span></span></code></pre></div><ul><li>通过 apply 调用数组的 concat 方法来实现转换</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">Array.prototype.concat.apply([], arrayLike);</span></span></code></pre></div><ul><li>通过 Array.from 方法来实现转换</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">Array.from(arrayLike);</span></span></code></pre></div><h3 id="_15-使用-reduce-求和" tabindex="-1">15. 使用 reduce 求和 <a class="header-anchor" href="#_15-使用-reduce-求和" aria-label="Permalink to &quot;15. 使用 reduce 求和&quot;">​</a></h3><p>arr = [1,2,3,4,5,6,7,8,9,10]，求和</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">let arr = [1,2,3,4,5,6,7,8,9,10]</span></span>
<span class="line"><span style="color:#babed8;">arr.reduce((prev, cur) =&gt; { return prev + cur }, 0)</span></span></code></pre></div><p>arr = [1,2,3,[[4,5],6],7,8,9]，求和</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">let arr = [1,2,3,4,5,6,7,8,9,10]</span></span>
<span class="line"><span style="color:#babed8;">arr.flat(Infinity).reduce((prev, cur) =&gt; { return prev + cur }, 0)</span></span></code></pre></div><p>arr = [{a:1, b:3}, {a:2, b:3, c:4}, {a:3}]，求和</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">let arr = [{a:9, b:3, c:4}, {a:1, b:3}, {a:3}] </span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">arr.reduce((prev, cur) =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">    return prev + cur[&quot;a&quot;];</span></span>
<span class="line"><span style="color:#babed8;">}, 0)</span></span></code></pre></div><h3 id="_16-将js对象转化为树形结构" tabindex="-1">16. 将js对象转化为树形结构 <a class="header-anchor" href="#_16-将js对象转化为树形结构" aria-label="Permalink to &quot;16. 将js对象转化为树形结构&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">// 转换前：</span></span>
<span class="line"><span style="color:#babed8;">source = [{</span></span>
<span class="line"><span style="color:#babed8;">            id: 1,</span></span>
<span class="line"><span style="color:#babed8;">            pid: 0,</span></span>
<span class="line"><span style="color:#babed8;">            name: &#39;body&#39;</span></span>
<span class="line"><span style="color:#babed8;">          }, {</span></span>
<span class="line"><span style="color:#babed8;">            id: 2,</span></span>
<span class="line"><span style="color:#babed8;">            pid: 1,</span></span>
<span class="line"><span style="color:#babed8;">            name: &#39;title&#39;</span></span>
<span class="line"><span style="color:#babed8;">          }, {</span></span>
<span class="line"><span style="color:#babed8;">            id: 3,</span></span>
<span class="line"><span style="color:#babed8;">            pid: 2,</span></span>
<span class="line"><span style="color:#babed8;">            name: &#39;div&#39;</span></span>
<span class="line"><span style="color:#babed8;">          }]</span></span>
<span class="line"><span style="color:#babed8;">// 转换为: </span></span>
<span class="line"><span style="color:#babed8;">tree = [{</span></span>
<span class="line"><span style="color:#babed8;">          id: 1,</span></span>
<span class="line"><span style="color:#babed8;">          pid: 0,</span></span>
<span class="line"><span style="color:#babed8;">          name: &#39;body&#39;,</span></span>
<span class="line"><span style="color:#babed8;">          children: [{</span></span>
<span class="line"><span style="color:#babed8;">            id: 2,</span></span>
<span class="line"><span style="color:#babed8;">            pid: 1,</span></span>
<span class="line"><span style="color:#babed8;">            name: &#39;title&#39;,</span></span>
<span class="line"><span style="color:#babed8;">            children: [{</span></span>
<span class="line"><span style="color:#babed8;">              id: 3,</span></span>
<span class="line"><span style="color:#babed8;">              pid: 1,</span></span>
<span class="line"><span style="color:#babed8;">              name: &#39;div&#39;</span></span>
<span class="line"><span style="color:#babed8;">            }]</span></span>
<span class="line"><span style="color:#babed8;">          }</span></span>
<span class="line"><span style="color:#babed8;">        }]</span></span></code></pre></div><p>代码实现：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">function jsonToTree(data) {</span></span>
<span class="line"><span style="color:#babed8;">  // 初始化结果数组，并判断输入数据的格式</span></span>
<span class="line"><span style="color:#babed8;">  let result = []</span></span>
<span class="line"><span style="color:#babed8;">  if(!Array.isArray(data)) {</span></span>
<span class="line"><span style="color:#babed8;">    return result</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">  // 使用map，将当前对象的id与当前对象对应存储起来</span></span>
<span class="line"><span style="color:#babed8;">  let map = {};</span></span>
<span class="line"><span style="color:#babed8;">  data.forEach(item =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">    map[item.id] = item;</span></span>
<span class="line"><span style="color:#babed8;">  });</span></span>
<span class="line"><span style="color:#babed8;">  // </span></span>
<span class="line"><span style="color:#babed8;">  data.forEach(item =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">    let parent = map[item.pid];</span></span>
<span class="line"><span style="color:#babed8;">    if(parent) {</span></span>
<span class="line"><span style="color:#babed8;">      (parent.children || (parent.children = [])).push(item);</span></span>
<span class="line"><span style="color:#babed8;">    } else {</span></span>
<span class="line"><span style="color:#babed8;">      result.push(item);</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">  });</span></span>
<span class="line"><span style="color:#babed8;">  return result;</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><h3 id="_17-使用es5和es6求函数参数的和" tabindex="-1">17. 使用ES5和ES6求函数参数的和 <a class="header-anchor" href="#_17-使用es5和es6求函数参数的和" aria-label="Permalink to &quot;17. 使用ES5和ES6求函数参数的和&quot;">​</a></h3><p>ES5：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">function sum() {</span></span>
<span class="line"><span style="color:#babed8;">    let sum = 0</span></span>
<span class="line"><span style="color:#babed8;">    Array.prototype.forEach.call(arguments, function(item) {</span></span>
<span class="line"><span style="color:#babed8;">        sum += item * 1</span></span>
<span class="line"><span style="color:#babed8;">    })</span></span>
<span class="line"><span style="color:#babed8;">    return sum</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><p>ES6：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">function sum(...nums) {</span></span>
<span class="line"><span style="color:#babed8;">    let sum = 0</span></span>
<span class="line"><span style="color:#babed8;">    nums.forEach(function(item) {</span></span>
<span class="line"><span style="color:#babed8;">        sum += item * 1</span></span>
<span class="line"><span style="color:#babed8;">    })</span></span>
<span class="line"><span style="color:#babed8;">    return sum</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><h3 id="_18-解析-url-params-为对象" tabindex="-1">18. 解析 URL Params 为对象 <a class="header-anchor" href="#_18-解析-url-params-为对象" aria-label="Permalink to &quot;18. 解析 URL Params 为对象&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">let url = &#39;http://www.domain.com/?user=anonymous&amp;id=123&amp;id=456&amp;city=%E5%8C%97%E4%BA%AC&amp;enabled&#39;;</span></span>
<span class="line"><span style="color:#babed8;">parseParam(url)</span></span>
<span class="line"><span style="color:#babed8;">/* 结果</span></span>
<span class="line"><span style="color:#babed8;">{ user: &#39;anonymous&#39;,</span></span>
<span class="line"><span style="color:#babed8;">  id: [ 123, 456 ], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型</span></span>
<span class="line"><span style="color:#babed8;">  city: &#39;北京&#39;, // 中文需解码</span></span>
<span class="line"><span style="color:#babed8;">  enabled: true, // 未指定值得 key 约定为 true</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">*/</span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">function parseParam(url) {</span></span>
<span class="line"><span style="color:#babed8;">  const paramsStr = /.+\\?(.+)$/.exec(url)[1]; // 将 ? 后面的字符串取出来</span></span>
<span class="line"><span style="color:#babed8;">  const paramsArr = paramsStr.split(&#39;&amp;&#39;); // 将字符串以 &amp; 分割后存到数组中</span></span>
<span class="line"><span style="color:#babed8;">  let paramsObj = {};</span></span>
<span class="line"><span style="color:#babed8;">  // 将 params 存到对象中</span></span>
<span class="line"><span style="color:#babed8;">  paramsArr.forEach(param =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">    if (/=/.test(param)) { // 处理有 value 的参数</span></span>
<span class="line"><span style="color:#babed8;">      let [key, val] = param.split(&#39;=&#39;); // 分割 key 和 value</span></span>
<span class="line"><span style="color:#babed8;">      val = decodeURIComponent(val); // 解码</span></span>
<span class="line"><span style="color:#babed8;">      val = /^\\d+$/.test(val) ? parseFloat(val) : val; // 判断是否转为数字</span></span>
<span class="line"><span style="color:#babed8;">      if (paramsObj.hasOwnProperty(key)) { // 如果对象有 key，则添加一个值</span></span>
<span class="line"><span style="color:#babed8;">        paramsObj[key] = [].concat(paramsObj[key], val);</span></span>
<span class="line"><span style="color:#babed8;">      } else { // 如果对象没有这个 key，创建 key 并设置值</span></span>
<span class="line"><span style="color:#babed8;">        paramsObj[key] = val;</span></span>
<span class="line"><span style="color:#babed8;">      }</span></span>
<span class="line"><span style="color:#babed8;">    } else { // 处理没有 value 的参数</span></span>
<span class="line"><span style="color:#babed8;">      paramsObj[param] = true;</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">  })</span></span>
<span class="line"><span style="color:#babed8;">  return paramsObj;</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><h2 id="三、场景应用" tabindex="-1">三、场景应用 <a class="header-anchor" href="#三、场景应用" aria-label="Permalink to &quot;三、场景应用&quot;">​</a></h2><h3 id="_1-循环打印红黄绿" tabindex="-1">1. 循环打印红黄绿 <a class="header-anchor" href="#_1-循环打印红黄绿" aria-label="Permalink to &quot;1. 循环打印红黄绿&quot;">​</a></h3><p>下面来看一道比较典型的问题，通过这个问题来对比几种异步编程方法：<strong>红灯 3s 亮一次，绿灯 1s 亮一次，黄灯 2s 亮一次；如何让三个灯不断交替重复亮灯？</strong></p><p>三个亮灯函数：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">function red() {</span></span>
<span class="line"><span style="color:#babed8;">    console.log(&#39;red&#39;);</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">function green() {</span></span>
<span class="line"><span style="color:#babed8;">    console.log(&#39;green&#39;);</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">function yellow() {</span></span>
<span class="line"><span style="color:#babed8;">    console.log(&#39;yellow&#39;);</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><p>这道题复杂的地方在于<strong>需要“交替重复”亮灯</strong>，而不是“亮完一次”就结束了。</p><h4 id="_1-用-callback-实现" tabindex="-1">（1）用 callback 实现 <a class="header-anchor" href="#_1-用-callback-实现" aria-label="Permalink to &quot;（1）用 callback 实现&quot;">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">const task = (timer, light, callback) =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">    setTimeout(() =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">        if (light === &#39;red&#39;) {</span></span>
<span class="line"><span style="color:#babed8;">            red()</span></span>
<span class="line"><span style="color:#babed8;">        }</span></span>
<span class="line"><span style="color:#babed8;">        else if (light === &#39;green&#39;) {</span></span>
<span class="line"><span style="color:#babed8;">            green()</span></span>
<span class="line"><span style="color:#babed8;">        }</span></span>
<span class="line"><span style="color:#babed8;">        else if (light === &#39;yellow&#39;) {</span></span>
<span class="line"><span style="color:#babed8;">            yellow()</span></span>
<span class="line"><span style="color:#babed8;">        }</span></span>
<span class="line"><span style="color:#babed8;">        callback()</span></span>
<span class="line"><span style="color:#babed8;">    }, timer)</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">task(3000, &#39;red&#39;, () =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">    task(2000, &#39;green&#39;, () =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">        task(1000, &#39;yellow&#39;, Function.prototype)</span></span>
<span class="line"><span style="color:#babed8;">    })</span></span>
<span class="line"><span style="color:#babed8;">})</span></span></code></pre></div><p>这里存在一个 bug：代码只是完成了一次流程，执行后红黄绿灯分别只亮一次。该如何让它交替重复进行呢？</p><p>上面提到过递归，可以递归亮灯的一个周期：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">const step = () =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">    task(3000, &#39;red&#39;, () =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">        task(2000, &#39;green&#39;, () =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">            task(1000, &#39;yellow&#39;, step)</span></span>
<span class="line"><span style="color:#babed8;">        })</span></span>
<span class="line"><span style="color:#babed8;">    })</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">step()</span></span></code></pre></div><p><strong>注意看黄灯亮的回调里又再次调用了 step 方法</strong> 以完成循环亮灯。</p><h4 id="_2-用-promise-实现" tabindex="-1">（2）用 promise 实现 <a class="header-anchor" href="#_2-用-promise-实现" aria-label="Permalink to &quot;（2）用 promise 实现&quot;">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">const task = (timer, light) =&gt; </span></span>
<span class="line"><span style="color:#babed8;">    new Promise((resolve, reject) =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">        setTimeout(() =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">            if (light === &#39;red&#39;) {</span></span>
<span class="line"><span style="color:#babed8;">                red()</span></span>
<span class="line"><span style="color:#babed8;">            }</span></span>
<span class="line"><span style="color:#babed8;">            else if (light === &#39;green&#39;) {</span></span>
<span class="line"><span style="color:#babed8;">                green()</span></span>
<span class="line"><span style="color:#babed8;">            }</span></span>
<span class="line"><span style="color:#babed8;">            else if (light === &#39;yellow&#39;) {</span></span>
<span class="line"><span style="color:#babed8;">                yellow()</span></span>
<span class="line"><span style="color:#babed8;">            }</span></span>
<span class="line"><span style="color:#babed8;">            resolve()</span></span>
<span class="line"><span style="color:#babed8;">        }, timer)</span></span>
<span class="line"><span style="color:#babed8;">    })</span></span>
<span class="line"><span style="color:#babed8;">const step = () =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">    task(3000, &#39;red&#39;)</span></span>
<span class="line"><span style="color:#babed8;">        .then(() =&gt; task(2000, &#39;green&#39;))</span></span>
<span class="line"><span style="color:#babed8;">        .then(() =&gt; task(1000, &#39;yellow&#39;))</span></span>
<span class="line"><span style="color:#babed8;">        .then(step)</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">step()</span></span></code></pre></div><p>这里将回调移除，在一次亮灯结束后，resolve 当前 promise，并依然使用递归进行。</p><h4 id="_3-用-async-await-实现" tabindex="-1">（3）用 async/await 实现 <a class="header-anchor" href="#_3-用-async-await-实现" aria-label="Permalink to &quot;（3）用 async/await 实现&quot;">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">const taskRunner =  async () =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">    await task(3000, &#39;red&#39;)</span></span>
<span class="line"><span style="color:#babed8;">    await task(2000, &#39;green&#39;)</span></span>
<span class="line"><span style="color:#babed8;">    await task(1000, &#39;yellow&#39;)</span></span>
<span class="line"><span style="color:#babed8;">    taskRunner()</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">taskRunner()</span></span></code></pre></div><h3 id="_2-实现每隔一秒打印-1-2-3-4" tabindex="-1">2. 实现每隔一秒打印 1,2,3,4 <a class="header-anchor" href="#_2-实现每隔一秒打印-1-2-3-4" aria-label="Permalink to &quot;2. 实现每隔一秒打印 1,2,3,4&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">// 使用闭包实现</span></span>
<span class="line"><span style="color:#babed8;">for (var i = 0; i &lt; 5; i++) {</span></span>
<span class="line"><span style="color:#babed8;">  (function(i) {</span></span>
<span class="line"><span style="color:#babed8;">    setTimeout(function() {</span></span>
<span class="line"><span style="color:#babed8;">      console.log(i);</span></span>
<span class="line"><span style="color:#babed8;">    }, i * 1000);</span></span>
<span class="line"><span style="color:#babed8;">  })(i);</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">// 使用 let 块级作用域</span></span>
<span class="line"><span style="color:#babed8;">for (let i = 0; i &lt; 5; i++) {</span></span>
<span class="line"><span style="color:#babed8;">  setTimeout(function() {</span></span>
<span class="line"><span style="color:#babed8;">    console.log(i);</span></span>
<span class="line"><span style="color:#babed8;">  }, i * 1000);</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><h3 id="_3-小孩报数问题" tabindex="-1">3. 小孩报数问题 <a class="header-anchor" href="#_3-小孩报数问题" aria-label="Permalink to &quot;3. 小孩报数问题&quot;">​</a></h3><p>有30个小孩儿，编号从1-30，围成一圈依此报数，1、2、3 数到 3 的小孩儿退出这个圈， 然后下一个小孩 重新报数 1、2、3，问最后剩下的那个小孩儿的编号是多少?</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">function childNum(num, count){</span></span>
<span class="line"><span style="color:#babed8;">    let allplayer = [];    </span></span>
<span class="line"><span style="color:#babed8;">    for(let i = 0; i &lt; num; i++){</span></span>
<span class="line"><span style="color:#babed8;">        allplayer[i] = i + 1;</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">    </span></span>
<span class="line"><span style="color:#babed8;">    let exitCount = 0;    // 离开人数</span></span>
<span class="line"><span style="color:#babed8;">    let counter = 0;      // 记录报数</span></span>
<span class="line"><span style="color:#babed8;">    let curIndex = 0;     // 当前下标</span></span>
<span class="line"><span style="color:#babed8;">    </span></span>
<span class="line"><span style="color:#babed8;">    while(exitCount &lt; num - 1){</span></span>
<span class="line"><span style="color:#babed8;">        if(allplayer[curIndex] !== 0) counter++;    </span></span>
<span class="line"><span style="color:#babed8;">        </span></span>
<span class="line"><span style="color:#babed8;">        if(counter == count){</span></span>
<span class="line"><span style="color:#babed8;">            allplayer[curIndex] = 0;                 </span></span>
<span class="line"><span style="color:#babed8;">            counter = 0;</span></span>
<span class="line"><span style="color:#babed8;">            exitCount++;  </span></span>
<span class="line"><span style="color:#babed8;">        }</span></span>
<span class="line"><span style="color:#babed8;">        curIndex++;</span></span>
<span class="line"><span style="color:#babed8;">        if(curIndex == num){</span></span>
<span class="line"><span style="color:#babed8;">            curIndex = 0               </span></span>
<span class="line"><span style="color:#babed8;">        };           </span></span>
<span class="line"><span style="color:#babed8;">    }    </span></span>
<span class="line"><span style="color:#babed8;">    for(i = 0; i &lt; num; i++){</span></span>
<span class="line"><span style="color:#babed8;">        if(allplayer[i] !== 0){</span></span>
<span class="line"><span style="color:#babed8;">            return allplayer[i]</span></span>
<span class="line"><span style="color:#babed8;">        }      </span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">childNum(30, 3)</span></span></code></pre></div><h3 id="_4-用promise实现图片的异步加载" tabindex="-1">4. 用Promise实现图片的异步加载 <a class="header-anchor" href="#_4-用promise实现图片的异步加载" aria-label="Permalink to &quot;4. 用Promise实现图片的异步加载&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">let imageAsync=(url)=&gt;{</span></span>
<span class="line"><span style="color:#babed8;">            return new Promise((resolve,reject)=&gt;{</span></span>
<span class="line"><span style="color:#babed8;">                let img = new Image();</span></span>
<span class="line"><span style="color:#babed8;">                img.src = url;</span></span>
<span class="line"><span style="color:#babed8;">                img.οnlοad=()=&gt;{</span></span>
<span class="line"><span style="color:#babed8;">                    console.log(\`图片请求成功，此处进行通用操作\`);</span></span>
<span class="line"><span style="color:#babed8;">                    resolve(image);</span></span>
<span class="line"><span style="color:#babed8;">                }</span></span>
<span class="line"><span style="color:#babed8;">                img.οnerrοr=(err)=&gt;{</span></span>
<span class="line"><span style="color:#babed8;">                    console.log(\`失败，此处进行失败的通用操作\`);</span></span>
<span class="line"><span style="color:#babed8;">                    reject(err);</span></span>
<span class="line"><span style="color:#babed8;">                }</span></span>
<span class="line"><span style="color:#babed8;">            })</span></span>
<span class="line"><span style="color:#babed8;">        }</span></span>
<span class="line"><span style="color:#babed8;">        </span></span>
<span class="line"><span style="color:#babed8;">imageAsync(&quot;url&quot;).then(()=&gt;{</span></span>
<span class="line"><span style="color:#babed8;">    console.log(&quot;加载成功&quot;);</span></span>
<span class="line"><span style="color:#babed8;">}).catch((error)=&gt;{</span></span>
<span class="line"><span style="color:#babed8;">    console.log(&quot;加载失败&quot;);</span></span>
<span class="line"><span style="color:#babed8;">})</span></span></code></pre></div><h3 id="_5-实现发布-订阅模式" tabindex="-1">5. 实现发布-订阅模式 <a class="header-anchor" href="#_5-实现发布-订阅模式" aria-label="Permalink to &quot;5. 实现发布-订阅模式&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">class EventCenter{</span></span>
<span class="line"><span style="color:#babed8;">  // 1. 定义事件容器，用来装事件数组</span></span>
<span class="line"><span style="color:#babed8;">    let handlers = {}</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  // 2. 添加事件方法，参数：事件名 事件方法</span></span>
<span class="line"><span style="color:#babed8;">  addEventListener(type, handler) {</span></span>
<span class="line"><span style="color:#babed8;">    // 创建新数组容器</span></span>
<span class="line"><span style="color:#babed8;">    if (!this.handlers[type]) {</span></span>
<span class="line"><span style="color:#babed8;">      this.handlers[type] = []</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">    // 存入事件</span></span>
<span class="line"><span style="color:#babed8;">    this.handlers[type].push(handler)</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  // 3. 触发事件，参数：事件名 事件参数</span></span>
<span class="line"><span style="color:#babed8;">  dispatchEvent(type, params) {</span></span>
<span class="line"><span style="color:#babed8;">    // 若没有注册该事件则抛出错误</span></span>
<span class="line"><span style="color:#babed8;">    if (!this.handlers[type]) {</span></span>
<span class="line"><span style="color:#babed8;">      return new Error(&#39;该事件未注册&#39;)</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">    // 触发事件</span></span>
<span class="line"><span style="color:#babed8;">    this.handlers[type].forEach(handler =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">      handler(...params)</span></span>
<span class="line"><span style="color:#babed8;">    })</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  // 4. 事件移除，参数：事件名 要删除事件，若无第二个参数则删除该事件的订阅和发布</span></span>
<span class="line"><span style="color:#babed8;">  removeEventListener(type, handler) {</span></span>
<span class="line"><span style="color:#babed8;">    if (!this.handlers[type]) {</span></span>
<span class="line"><span style="color:#babed8;">      return new Error(&#39;事件无效&#39;)</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">    if (!handler) {</span></span>
<span class="line"><span style="color:#babed8;">      // 移除事件</span></span>
<span class="line"><span style="color:#babed8;">      delete this.handlers[type]</span></span>
<span class="line"><span style="color:#babed8;">    } else {</span></span>
<span class="line"><span style="color:#babed8;">      const index = this.handlers[type].findIndex(el =&gt; el === handler)</span></span>
<span class="line"><span style="color:#babed8;">      if (index === -1) {</span></span>
<span class="line"><span style="color:#babed8;">        return new Error(&#39;无该绑定事件&#39;)</span></span>
<span class="line"><span style="color:#babed8;">      }</span></span>
<span class="line"><span style="color:#babed8;">      // 移除事件</span></span>
<span class="line"><span style="color:#babed8;">      this.handlers[type].splice(index, 1)</span></span>
<span class="line"><span style="color:#babed8;">      if (this.handlers[type].length === 0) {</span></span>
<span class="line"><span style="color:#babed8;">        delete this.handlers[type]</span></span>
<span class="line"><span style="color:#babed8;">      }</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><h3 id="_6-查找文章中出现频率最高的单词" tabindex="-1">6. 查找文章中出现频率最高的单词 <a class="header-anchor" href="#_6-查找文章中出现频率最高的单词" aria-label="Permalink to &quot;6. 查找文章中出现频率最高的单词&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">function findMostWord(article) {</span></span>
<span class="line"><span style="color:#babed8;">  // 合法性判断</span></span>
<span class="line"><span style="color:#babed8;">  if (!article) return;</span></span>
<span class="line"><span style="color:#babed8;">  // 参数处理</span></span>
<span class="line"><span style="color:#babed8;">  article = article.trim().toLowerCase();</span></span>
<span class="line"><span style="color:#babed8;">  let wordList = article.match(/[a-z]+/g),</span></span>
<span class="line"><span style="color:#babed8;">    visited = [],</span></span>
<span class="line"><span style="color:#babed8;">    maxNum = 0,</span></span>
<span class="line"><span style="color:#babed8;">    maxWord = &quot;&quot;;</span></span>
<span class="line"><span style="color:#babed8;">  article = &quot; &quot; + wordList.join(&quot;  &quot;) + &quot; &quot;;</span></span>
<span class="line"><span style="color:#babed8;">  // 遍历判断单词出现次数</span></span>
<span class="line"><span style="color:#babed8;">  wordList.forEach(function(item) {</span></span>
<span class="line"><span style="color:#babed8;">    if (visited.indexOf(item) &lt; 0) {</span></span>
<span class="line"><span style="color:#babed8;">      // 加入 visited </span></span>
<span class="line"><span style="color:#babed8;">      visited.push(item);</span></span>
<span class="line"><span style="color:#babed8;">      let word = new RegExp(&quot; &quot; + item + &quot; &quot;, &quot;g&quot;),</span></span>
<span class="line"><span style="color:#babed8;">        num = article.match(word).length;</span></span>
<span class="line"><span style="color:#babed8;">      if (num &gt; maxNum) {</span></span>
<span class="line"><span style="color:#babed8;">        maxNum = num;</span></span>
<span class="line"><span style="color:#babed8;">        maxWord = item;</span></span>
<span class="line"><span style="color:#babed8;">      }</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">  });</span></span>
<span class="line"><span style="color:#babed8;">  return maxWord + &quot;  &quot; + maxNum;</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><h3 id="_7-封装异步的fetch-使用async-await方式来使用" tabindex="-1">7. 封装异步的fetch，使用async await方式来使用 <a class="header-anchor" href="#_7-封装异步的fetch-使用async-await方式来使用" aria-label="Permalink to &quot;7. 封装异步的fetch，使用async await方式来使用&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">(async () =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">    class HttpRequestUtil {</span></span>
<span class="line"><span style="color:#babed8;">        async get(url) {</span></span>
<span class="line"><span style="color:#babed8;">            const res = await fetch(url);</span></span>
<span class="line"><span style="color:#babed8;">            const data = await res.json();</span></span>
<span class="line"><span style="color:#babed8;">            return data;</span></span>
<span class="line"><span style="color:#babed8;">        }</span></span>
<span class="line"><span style="color:#babed8;">        async post(url, data) {</span></span>
<span class="line"><span style="color:#babed8;">            const res = await fetch(url, {</span></span>
<span class="line"><span style="color:#babed8;">                method: &#39;POST&#39;,</span></span>
<span class="line"><span style="color:#babed8;">                headers: {</span></span>
<span class="line"><span style="color:#babed8;">                    &#39;Content-Type&#39;: &#39;application/json&#39;</span></span>
<span class="line"><span style="color:#babed8;">                },</span></span>
<span class="line"><span style="color:#babed8;">                body: JSON.stringify(data)</span></span>
<span class="line"><span style="color:#babed8;">            });</span></span>
<span class="line"><span style="color:#babed8;">            const result = await res.json();</span></span>
<span class="line"><span style="color:#babed8;">            return result;</span></span>
<span class="line"><span style="color:#babed8;">        }</span></span>
<span class="line"><span style="color:#babed8;">        async put(url, data) {</span></span>
<span class="line"><span style="color:#babed8;">            const res = await fetch(url, {</span></span>
<span class="line"><span style="color:#babed8;">                method: &#39;PUT&#39;,</span></span>
<span class="line"><span style="color:#babed8;">                headers: {</span></span>
<span class="line"><span style="color:#babed8;">                    &#39;Content-Type&#39;: &#39;application/json&#39;</span></span>
<span class="line"><span style="color:#babed8;">                },</span></span>
<span class="line"><span style="color:#babed8;">                data: JSON.stringify(data)</span></span>
<span class="line"><span style="color:#babed8;">            });</span></span>
<span class="line"><span style="color:#babed8;">            const result = await res.json();</span></span>
<span class="line"><span style="color:#babed8;">            return result;</span></span>
<span class="line"><span style="color:#babed8;">        }</span></span>
<span class="line"><span style="color:#babed8;">        async delete(url, data) {</span></span>
<span class="line"><span style="color:#babed8;">            const res = await fetch(url, {</span></span>
<span class="line"><span style="color:#babed8;">                method: &#39;DELETE&#39;,</span></span>
<span class="line"><span style="color:#babed8;">                headers: {</span></span>
<span class="line"><span style="color:#babed8;">                    &#39;Content-Type&#39;: &#39;application/json&#39;</span></span>
<span class="line"><span style="color:#babed8;">                },</span></span>
<span class="line"><span style="color:#babed8;">                data: JSON.stringify(data)</span></span>
<span class="line"><span style="color:#babed8;">            });</span></span>
<span class="line"><span style="color:#babed8;">            const result = await res.json();</span></span>
<span class="line"><span style="color:#babed8;">            return result;</span></span>
<span class="line"><span style="color:#babed8;">        }</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">    const httpRequestUtil = new HttpRequestUtil();</span></span>
<span class="line"><span style="color:#babed8;">    const res = await httpRequestUtil.get(&#39;http://golderbrother.cn/&#39;);</span></span>
<span class="line"><span style="color:#babed8;">    console.log(res);</span></span>
<span class="line"><span style="color:#babed8;">})();</span></span></code></pre></div><h3 id="_8-实现prototype继承" tabindex="-1">8. 实现prototype继承 <a class="header-anchor" href="#_8-实现prototype继承" aria-label="Permalink to &quot;8. 实现prototype继承&quot;">​</a></h3><p>所谓的原型链继承就是让新实例的原型等于父类的实例：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">//父方法</span></span>
<span class="line"><span style="color:#babed8;">function SupperFunction(flag1){</span></span>
<span class="line"><span style="color:#babed8;">    this.flag1 = flag1;</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">//子方法</span></span>
<span class="line"><span style="color:#babed8;">function SubFunction(flag2){</span></span>
<span class="line"><span style="color:#babed8;">    this.flag2 = flag2;</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">//父实例</span></span>
<span class="line"><span style="color:#babed8;">var superInstance = new SupperFunction(true);</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">//子继承父</span></span>
<span class="line"><span style="color:#babed8;">SubFunction.prototype = superInstance;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">//子实例</span></span>
<span class="line"><span style="color:#babed8;">var subInstance = new SubFunction(false);</span></span>
<span class="line"><span style="color:#babed8;">//子调用自己和父的属性</span></span>
<span class="line"><span style="color:#babed8;">subInstance.flag1;   // true</span></span>
<span class="line"><span style="color:#babed8;">subInstance.flag2;   // false</span></span></code></pre></div><h3 id="_9-实现双向数据绑定" tabindex="-1">9. 实现双向数据绑定 <a class="header-anchor" href="#_9-实现双向数据绑定" aria-label="Permalink to &quot;9. 实现双向数据绑定&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">let obj = {}</span></span>
<span class="line"><span style="color:#babed8;">let input = document.getElementById(&#39;input&#39;)</span></span>
<span class="line"><span style="color:#babed8;">let span = document.getElementById(&#39;span&#39;)</span></span>
<span class="line"><span style="color:#babed8;">// 数据劫持</span></span>
<span class="line"><span style="color:#babed8;">Object.defineProperty(obj, &#39;text&#39;, {</span></span>
<span class="line"><span style="color:#babed8;">  configurable: true,</span></span>
<span class="line"><span style="color:#babed8;">  enumerable: true,</span></span>
<span class="line"><span style="color:#babed8;">  get() {</span></span>
<span class="line"><span style="color:#babed8;">    console.log(&#39;获取数据了&#39;)</span></span>
<span class="line"><span style="color:#babed8;">  },</span></span>
<span class="line"><span style="color:#babed8;">  set(newVal) {</span></span>
<span class="line"><span style="color:#babed8;">    console.log(&#39;数据更新了&#39;)</span></span>
<span class="line"><span style="color:#babed8;">    input.value = newVal</span></span>
<span class="line"><span style="color:#babed8;">    span.innerHTML = newVal</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">})</span></span>
<span class="line"><span style="color:#babed8;">// 输入监听</span></span>
<span class="line"><span style="color:#babed8;">input.addEventListener(&#39;keyup&#39;, function(e) {</span></span>
<span class="line"><span style="color:#babed8;">  obj.text = e.target.value</span></span>
<span class="line"><span style="color:#babed8;">})</span></span></code></pre></div><h3 id="_10-实现简单路由" tabindex="-1">10. 实现简单路由 <a class="header-anchor" href="#_10-实现简单路由" aria-label="Permalink to &quot;10. 实现简单路由&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">// hash路由</span></span>
<span class="line"><span style="color:#babed8;">class Route{</span></span>
<span class="line"><span style="color:#babed8;">  constructor(){</span></span>
<span class="line"><span style="color:#babed8;">    // 路由存储对象</span></span>
<span class="line"><span style="color:#babed8;">    this.routes = {}</span></span>
<span class="line"><span style="color:#babed8;">    // 当前hash</span></span>
<span class="line"><span style="color:#babed8;">    this.currentHash = &#39;&#39;</span></span>
<span class="line"><span style="color:#babed8;">    // 绑定this，避免监听时this指向改变</span></span>
<span class="line"><span style="color:#babed8;">    this.freshRoute = this.freshRoute.bind(this)</span></span>
<span class="line"><span style="color:#babed8;">    // 监听</span></span>
<span class="line"><span style="color:#babed8;">    window.addEventListener(&#39;load&#39;, this.freshRoute, false)</span></span>
<span class="line"><span style="color:#babed8;">    window.addEventListener(&#39;hashchange&#39;, this.freshRoute, false)</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">  // 存储</span></span>
<span class="line"><span style="color:#babed8;">  storeRoute (path, cb) {</span></span>
<span class="line"><span style="color:#babed8;">    this.routes[path] = cb || function () {}</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">  // 更新</span></span>
<span class="line"><span style="color:#babed8;">  freshRoute () {</span></span>
<span class="line"><span style="color:#babed8;">    this.currentHash = location.hash.slice(1) || &#39;/&#39;</span></span>
<span class="line"><span style="color:#babed8;">    this.routes[this.currentHash]()</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><h3 id="_11-实现斐波那契数列" tabindex="-1">11. 实现斐波那契数列 <a class="header-anchor" href="#_11-实现斐波那契数列" aria-label="Permalink to &quot;11. 实现斐波那契数列&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">// 递归</span></span>
<span class="line"><span style="color:#babed8;">function fn (n){</span></span>
<span class="line"><span style="color:#babed8;">    if(n==0) return 0</span></span>
<span class="line"><span style="color:#babed8;">    if(n==1) return 1</span></span>
<span class="line"><span style="color:#babed8;">    return fn(n-2)+fn(n-1)</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">// 优化</span></span>
<span class="line"><span style="color:#babed8;">function fibonacci2(n) {</span></span>
<span class="line"><span style="color:#babed8;">    const arr = [1, 1, 2];</span></span>
<span class="line"><span style="color:#babed8;">    const arrLen = arr.length;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    if (n &lt;= arrLen) {</span></span>
<span class="line"><span style="color:#babed8;">        return arr[n];</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    for (let i = arrLen; i &lt; n; i++) {</span></span>
<span class="line"><span style="color:#babed8;">        arr.push(arr[i - 1] + arr[ i - 2]);</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    return arr[arr.length - 1];</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">// 非递归</span></span>
<span class="line"><span style="color:#babed8;">function fn(n) {</span></span>
<span class="line"><span style="color:#babed8;">    let pre1 = 1;</span></span>
<span class="line"><span style="color:#babed8;">    let pre2 = 1;</span></span>
<span class="line"><span style="color:#babed8;">    let current = 2;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    if (n &lt;= 2) {</span></span>
<span class="line"><span style="color:#babed8;">        return current;</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    for (let i = 2; i &lt; n; i++) {</span></span>
<span class="line"><span style="color:#babed8;">        pre1 = pre2;</span></span>
<span class="line"><span style="color:#babed8;">        pre2 = current;</span></span>
<span class="line"><span style="color:#babed8;">        current = pre1 + pre2;</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    return current;</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><h3 id="_12-字符串出现的不重复最长长度" tabindex="-1">12. 字符串出现的不重复最长长度 <a class="header-anchor" href="#_12-字符串出现的不重复最长长度" aria-label="Permalink to &quot;12. 字符串出现的不重复最长长度&quot;">​</a></h3><p>用一个滑动窗口装没有重复的字符，枚举字符记录最大值即可。用 map 维护字符的索引，遇到相同的字符，把左边界移动过去即可。挪动的过程中记录最大长度：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">var lengthOfLongestSubstring = function (s) {</span></span>
<span class="line"><span style="color:#babed8;">    let map = new Map();</span></span>
<span class="line"><span style="color:#babed8;">    let i = -1</span></span>
<span class="line"><span style="color:#babed8;">    let res = 0</span></span>
<span class="line"><span style="color:#babed8;">    let n = s.length</span></span>
<span class="line"><span style="color:#babed8;">    for (let j = 0; j &lt; n; j++) {</span></span>
<span class="line"><span style="color:#babed8;">        if (map.has(s[j])) {</span></span>
<span class="line"><span style="color:#babed8;">            i = Math.max(i, map.get(s[j]))</span></span>
<span class="line"><span style="color:#babed8;">        }</span></span>
<span class="line"><span style="color:#babed8;">        res = Math.max(res, j - i)</span></span>
<span class="line"><span style="color:#babed8;">        map.set(s[j], j)</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">    return res</span></span>
<span class="line"><span style="color:#babed8;">};</span></span></code></pre></div><h3 id="_13-使用-settimeout-实现-setinterval" tabindex="-1">13. 使用 setTimeout 实现 setInterval <a class="header-anchor" href="#_13-使用-settimeout-实现-setinterval" aria-label="Permalink to &quot;13. 使用 setTimeout 实现 setInterval&quot;">​</a></h3><p>setInterval 的作用是每隔一段指定时间执行一个函数，但是这个执行不是真的到了时间立即执行，它真正的作用是每隔一段时间将事件加入事件队列中去，只有当当前的执行栈为空的时候，才能去从事件队列中取出事件执行。所以可能会出现这样的情况，就是当前执行栈执行的时间很长，导致事件队列里边积累多个定时器加入的事件，当执行栈结束的时候，这些事件会依次执行，因此就不能到间隔一段时间执行的效果。</p><p>针对 setInterval 的这个缺点，我们可以使用 setTimeout 递归调用来模拟 setInterval，这样我们就确保了只有一个事件结束了，我们才会触发下一个定时器事件，这样解决了 setInterval 的问题。</p><p>实现思路是使用递归函数，不断地去执行 setTimeout 从而达到 setInterval 的效果</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">function mySetInterval(fn, timeout) {</span></span>
<span class="line"><span style="color:#babed8;">  // 控制器，控制定时器是否继续执行</span></span>
<span class="line"><span style="color:#babed8;">  var timer = {</span></span>
<span class="line"><span style="color:#babed8;">    flag: true</span></span>
<span class="line"><span style="color:#babed8;">  };</span></span>
<span class="line"><span style="color:#babed8;">  // 设置递归函数，模拟定时器执行。</span></span>
<span class="line"><span style="color:#babed8;">  function interval() {</span></span>
<span class="line"><span style="color:#babed8;">    if (timer.flag) {</span></span>
<span class="line"><span style="color:#babed8;">      fn();</span></span>
<span class="line"><span style="color:#babed8;">      setTimeout(interval, timeout);</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">  // 启动定时器</span></span>
<span class="line"><span style="color:#babed8;">  setTimeout(interval, timeout);</span></span>
<span class="line"><span style="color:#babed8;">  // 返回控制器</span></span>
<span class="line"><span style="color:#babed8;">  return timer;</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><h3 id="_14-实现-jsonp" tabindex="-1">14. 实现 jsonp <a class="header-anchor" href="#_14-实现-jsonp" aria-label="Permalink to &quot;14. 实现 jsonp&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">// 动态的加载js文件</span></span>
<span class="line"><span style="color:#babed8;">function addScript(src) {</span></span>
<span class="line"><span style="color:#babed8;">  const script = document.createElement(&#39;script&#39;);</span></span>
<span class="line"><span style="color:#babed8;">  script.src = src;</span></span>
<span class="line"><span style="color:#babed8;">  script.type = &quot;text/javascript&quot;;</span></span>
<span class="line"><span style="color:#babed8;">  document.body.appendChild(script);</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">addScript(&quot;http://xxx.xxx.com/xxx.js?callback=handleRes&quot;);</span></span>
<span class="line"><span style="color:#babed8;">// 设置一个全局的callback函数来接收回调结果</span></span>
<span class="line"><span style="color:#babed8;">function handleRes(res) {</span></span>
<span class="line"><span style="color:#babed8;">  console.log(res);</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">// 接口返回的数据格式</span></span>
<span class="line"><span style="color:#babed8;">handleRes({a: 1, b: 2});</span></span></code></pre></div><h3 id="_15-判断对象是否存在循环引用" tabindex="-1">15. 判断对象是否存在循环引用 <a class="header-anchor" href="#_15-判断对象是否存在循环引用" aria-label="Permalink to &quot;15. 判断对象是否存在循环引用&quot;">​</a></h3><p>循环引用对象本来没有什么问题，但是序列化的时候就会发生问题，比如调用<code>JSON.stringify()</code>对该类对象进行序列化，就会报错: <code>Converting circular structure to JSON.</code></p><p>下面方法可以用来判断一个对象中是否已存在循环引用：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">const isCycleObject = (obj,parent) =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">    const parentArr = parent || [obj];</span></span>
<span class="line"><span style="color:#babed8;">    for(let i in obj) {</span></span>
<span class="line"><span style="color:#babed8;">        if(typeof obj[i] === &#39;object&#39;) {</span></span>
<span class="line"><span style="color:#babed8;">            let flag = false;</span></span>
<span class="line"><span style="color:#babed8;">            parentArr.forEach((pObj) =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">                if(pObj === obj[i]){</span></span>
<span class="line"><span style="color:#babed8;">                    flag = true;</span></span>
<span class="line"><span style="color:#babed8;">                }</span></span>
<span class="line"><span style="color:#babed8;">            })</span></span>
<span class="line"><span style="color:#babed8;">            if(flag) return true;</span></span>
<span class="line"><span style="color:#babed8;">            flag = isCycleObject(obj[i],[...parentArr,obj[i]]);</span></span>
<span class="line"><span style="color:#babed8;">            if(flag) return true;</span></span>
<span class="line"><span style="color:#babed8;">        }</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">    return false;</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">const a = 1;</span></span>
<span class="line"><span style="color:#babed8;">const b = {a};</span></span>
<span class="line"><span style="color:#babed8;">const c = {b};</span></span>
<span class="line"><span style="color:#babed8;">const o = {d:{a:3},c}</span></span>
<span class="line"><span style="color:#babed8;">o.c.b.aa = a;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">console.log(isCycleObject(o)</span></span></code></pre></div><p>查找有序二维数组的目标值：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">var findNumberIn2DArray = function(matrix, target) {</span></span>
<span class="line"><span style="color:#babed8;">    if (matrix == null || matrix.length == 0) {</span></span>
<span class="line"><span style="color:#babed8;">        return false;</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">    let row = 0;</span></span>
<span class="line"><span style="color:#babed8;">    let column = matrix[0].length - 1;</span></span>
<span class="line"><span style="color:#babed8;">    while (row &lt; matrix.length &amp;&amp; column &gt;= 0) {</span></span>
<span class="line"><span style="color:#babed8;">        if (matrix[row][column] == target) {</span></span>
<span class="line"><span style="color:#babed8;">            return true;</span></span>
<span class="line"><span style="color:#babed8;">        } else if (matrix[row][column] &gt; target) {</span></span>
<span class="line"><span style="color:#babed8;">            column--;</span></span>
<span class="line"><span style="color:#babed8;">        } else {</span></span>
<span class="line"><span style="color:#babed8;">            row++;</span></span>
<span class="line"><span style="color:#babed8;">        }</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">    return false;</span></span>
<span class="line"><span style="color:#babed8;">};</span></span></code></pre></div><p>二维数组斜向打印：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">function printMatrix(arr){</span></span>
<span class="line"><span style="color:#babed8;">  let m = arr.length, n = arr[0].length</span></span>
<span class="line"><span style="color:#babed8;">    let res = []</span></span>
<span class="line"><span style="color:#babed8;">  </span></span>
<span class="line"><span style="color:#babed8;">  // 左上角，从0 到 n - 1 列进行打印</span></span>
<span class="line"><span style="color:#babed8;">  for (let k = 0; k &lt; n; k++) {</span></span>
<span class="line"><span style="color:#babed8;">    for (let i = 0, j = k; i &lt; m &amp;&amp; j &gt;= 0; i++, j--) {</span></span>
<span class="line"><span style="color:#babed8;">      res.push(arr[i][j]);</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  // 右下角，从1 到 n - 1 行进行打印</span></span>
<span class="line"><span style="color:#babed8;">  for (let k = 1; k &lt; m; k++) {</span></span>
<span class="line"><span style="color:#babed8;">    for (let i = k, j = n - 1; i &lt; m &amp;&amp; j &gt;= 0; i++, j--) {</span></span>
<span class="line"><span style="color:#babed8;">      res.push(arr[i][j]);</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">  return res</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div>`,273)]))}const F=a(e,[["render",o]]);export{d as __pageData,F as default};