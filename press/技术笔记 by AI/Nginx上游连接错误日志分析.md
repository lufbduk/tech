# Nginx上游连接错误日志分析（内存不足）



2025/05/11 23:52:08 [error] 3599761#3599761: *3 upstream prematurely closed connection while reading response header from upstream, client: 【已脱敏ip地址】, server: 【已脱敏域名】, request: "POST /api/v1/embeddings HTTP/1.1", upstream: "http://127.0.0.1:8000/api/v1/embeddings", host: "【已脱敏ip地址】", referrer: "http://【已脱敏ip地址】/api/v1/docs"
2025/05/11 23:52:08 [warn] 3599761#3599761: *3 upstream server temporarily disabled while reading response header from upstream, client: 【已脱敏ip地址】, server: 【已脱敏域名】, request: "POST /api/v1/embeddings HTTP/1.1", upstream: "http://127.0.0.1:8000/api/v1/embeddings", host: "【已脱敏ip地址】", referrer: "http://【已脱敏ip地址】/api/v1/docs"
2025/05/11 23:57:48 [error] 3599760#3599760: *9 upstream prematurely closed connection while reading response header from upstream, client: 【已脱敏ip地址】, server: 【已脱敏域名】, request: "GET /api/v1/text-embedding/%E4%BD%A0%E5%A5%BD HTTP/1.1", upstream: "http://127.0.0.1:8000/api/v1/text-embedding/%E4%BD%A0%E5%A5%BD", host: "【已脱敏ip地址】", referrer: "http://【已脱敏ip地址】/api/v1/docs"
2025/05/11 23:57:48 [warn] 3599760#3599760: *9 upstream server temporarily disabled while reading response header from upstream, client: 【已脱敏ip地址】, server: 【已脱敏域名】, request: "GET /api/v1/text-embedding/%E4%BD%A0%E5%A5%BD HTTP/1.1", upstream: "http://127.0.0.1:8000/api/v1/text-embedding/%E4%BD%A0%E5%A5%BD", host: "【已脱敏ip地址】", referrer: "http://【已脱敏ip地址】/api/v1/docs"
2025/05/11 23:57:48 [error] 3599760#3599760: *9 recv() failed (104: Connection reset by peer) while reading response header from upstream, client: 【已脱敏ip地址】, server: 【已脱敏域名】, request: "GET /api/v1/text-embedding/%E4%BD%A0%E5%A5%BD HTTP/1.1", upstream: "http://[::1]:8000/api/v1/text-embedding/%E4%BD%A0%E5%A5%BD", host: "【已脱敏ip地址】", referrer: "http://【已脱敏ip地址】/api/v1/docs"
2025/05/11 23:57:48 [warn] 3599760#3599760: *9 upstream server temporarily disabled while reading response header from upstream, client: 【已脱敏ip地址】, server: 【已脱敏域名】, request: "GET /api/v1/text-embedding/%E4%BD%A0%E5%A5%BD HTTP/1.1", upstream: "http://[::1]:8000/api/v1/text-embedding/%E4%BD%A0%E5%A5%BD", host: "【已脱敏ip地址】", referrer: "http://【已脱敏ip地址】/api/v1/docs"
2025/05/12 00:09:19 [error] 3599760#3599760: *32 upstream prematurely closed connection while reading response header from upstream, client: 【已脱敏ip地址】, server: 【已脱敏域名】, request: "GET /api/v1/model/info HTTP/1.1", upstream: "http://127.0.0.1:8000/api/v1/model/info", host: "【已脱敏ip地址】", referrer: "http://【已脱敏ip地址】/api/v1/docs"
2025/05/12 00:09:19 [warn] 3599760#3599760: *32 upstream server temporarily disabled while reading response header from upstream, client: 【已脱敏ip地址】, server: 【已脱敏域名】, request: "GET /api/v1/model/info HTTP/1.1", upstream: "http://127.0.0.1:8000/api/v1/model/info", host: "【已脱敏ip地址】", referrer: "http://【已脱敏ip地址】/api/v1/docs"
2025/05/12 00:09:19 [error] 3599760#3599760: *32 recv() failed (104: Connection reset by peer) while reading response header from upstream, client: 【已脱敏ip地址】, server: 【已脱敏域名】, request: "GET /api/v1/model/info HTTP/1.1", upstream: "http://[::1]:8000/api/v1/model/info", host: "【已脱敏ip地址】", referrer: "http://【已脱敏ip地址】/api/v1/docs"
2025/05/12 00:09:19 [warn] 3599760#3599760: *32 upstream server temporarily disabled while reading response header from upstream, client: 【已脱敏ip地址】, server: 【已脱敏域名】, request: "GET /api/v1/model/info HTTP/1.1", upstream: "http://[::1]:8000/api/v1/model/info", host: "【已脱敏ip地址】", referrer: "http://【已脱敏ip地址】/api/v1/docs"
2025/05/12 00:15:19 [notice] 3599759#3599759: signal 3 (SIGQUIT) received from 1, shutting down
2025/05/12 00:15:19 [notice] 3599760#3599760: gracefully shutting down


上述日志说明什么







这些Nginx错误日志表明您的上游服务（运行在127.0.0.1:8000或[::1]:8000）存在连接问题。以下是关键问题的分析：

1. **主要错误类型**：
   - `upstream prematurely closed connection`（上游过早关闭连接）
   - `recv() failed (104: Connection reset by peer)`（对端重置连接）
   - 伴随`upstream server temporarily disabled`警告（Nginx暂时禁用了该上游服务器）

2. **问题表现**：
   - 上游服务在处理请求（POST /embeddings、GET /text-embedding、GET /model/info）时突然断开连接
   - 问题同时出现在IPv4(127.0.0.1)和IPv6(::1)地址上
   - 最终Nginx收到了关闭信号(SIGQUIT)开始优雅关闭

3. **可能原因**：
   - 上游服务(8000端口)崩溃或进程被杀死
   - 上游服务资源不足（OOM被系统终止）
   - 请求超时时间设置过短
   - 上游服务存在bug导致崩溃
   - 服务器资源耗尽（内存/CPU）
   - 网络配置问题（特别是同时出现IPv4/IPv6失败）

4. **建议解决方案**：
   - 检查上游服务日志（8000端口的应用日志）
   - 监控服务器资源使用情况（内存/CPU）
   - 增加Nginx的proxy_read_timeout值
   - 检查上游服务的稳定性（是否有内存泄漏）
   - 验证上游服务是否能处理这些特定请求
   - 检查是否有监控系统或管理操作导致了服务重启

需要特别注意这些错误集中在短时间内发生，且最终导致Nginx重启，表明上游服务可能已经完全不可用。建议优先检查上游服务的状态和日志。







2025/05/12 00:15:19 [notice] 3609160#3609160: start worker process 3609161
2025/05/12 00:15:19 [notice] 3609160#3609160: start worker process 3609163
2025/05/12 00:17:53 [error] 3609161#3609161: *1 upstream prematurely closed connection while reading response header from upstream, client: 【已脱敏ip地址】, server: 【已脱敏域名】, request: "GET /api/v1/model/info HTTP/1.1", upstream: "http://[::1]:8000/api/v1/model/info", host: "【已脱敏域名】", referrer: "http://【已脱敏域名】/api/v1/docs"
2025/05/12 00:17:53 [warn] 3609161#3609161: *1 upstream server temporarily disabled while reading response header from upstream, client: 【已脱敏ip地址】, server: 【已脱敏域名】, request: "GET /api/v1/model/info HTTP/1.1", upstream: "http://[::1]:8000/api/v1/model/info", host: "【已脱敏域名】", referrer: "http://【已脱敏域名】/api/v1/docs"
2025/05/12 00:17:53 [error] 3609161#3609161: *1 recv() failed (104: Connection reset by peer) while reading response header from upstream, client: 【已脱敏ip地址】, server: 【已脱敏域名】, request: "GET /api/v1/model/info HTTP/1.1", upstream: "http://127.0.0.1:8000/api/v1/model/info", host: "【已脱敏域名】", referrer: "http://【已脱敏域名】/api/v1/docs"
2025/05/12 00:17:53 [warn] 3609161#3609161: *1 upstream server temporarily disabled while reading response header from upstream, client: 【已脱敏ip地址】, server: 【已脱敏域名】, request: "GET /api/v1/model/info HTTP/1.1", upstream: "http://127.0.0.1:8000/api/v1/model/info", host: "【已脱敏域名】", referrer: "http://【已脱敏域名】/api/v1/docs"

这段呢







这段日志是前一段问题的延续，显示Nginx重启后上游服务仍然存在问题。以下是具体分析：

---

### **关键日志解析**
1. **Nginx重启**  
   - `2025/05/12 00:15:19 [notice] 3609160#3609160: start worker process 3609161`  
     Nginx主进程启动了新的Worker进程（可能是服务重启或配置重载）。

2. **上游服务仍不可用**  
   - 2分钟后（`00:17:53`），客户端再次请求 `GET /api/v1/model/info`，但依然失败：
     - **IPv6尝试失败** (`[::1]:8000`)：
       ```log
       upstream prematurely closed connection
       recv() failed (104: Connection reset by peer)
       ```
     - **IPv4尝试失败** (`127.0.0.1:8000`)：
       ```log
       upstream server temporarily disabled
       ```

---

### **问题诊断**
1. **上游服务未恢复**  
   - Nginx重启后，上游服务（`8000`端口）仍然无法正常响应，可能是：
     - 服务进程未启动或崩溃。
     - 服务启动但监听失败（端口冲突、配置错误）。
     - 服务启动后因异常（如OOM、崩溃）再次退出。

2. **连接重置（Connection reset by peer）**  
   - 上游服务主动断开连接，可能原因：
     - 服务进程崩溃（如Python应用未捕获异常）。
     - 资源不足（内存/CPU耗尽，被系统终止）。
     - 请求触发了服务的Bug（如特定接口导致崩溃）。

3. **IPv4和IPv6双栈失败**  
   - 日志显示Nginx同时尝试了IPv6(`[::1]`)和IPv4(`127.0.0.1`)，均失败，说明问题与网络协议无关，而是上游服务本身的问题。

---

### **建议排查步骤**
1. **检查上游服务状态**  
   ```bash
   # 检查8000端口是否在监听
   ss -tulnp | grep 8000

   # 检查服务进程是否运行
   ps aux | grep "你的服务进程名"
   ```

2. **查看上游服务日志**  
   - 直接查看上游服务（如FastAPI、Flask等）的日志，定位崩溃原因：
     ```bash
     journalctl -u your-service-name  # systemd服务
     cat /var/log/your-app.log       # 自定义日志路径
     ```

3. **验证服务是否响应**  
   - 手动测试上游服务是否健康：
     ```bash
     curl -v http://127.0.0.1:8000/api/v1/model/info
     ```

4. **检查资源限制**  
   - 确认服务器资源（内存、CPU）是否充足：
     ```bash
     free -h    # 内存
     top        # CPU和进程状态
     dmesg      # 查看内核日志（OOM Killer记录）
     ```

5. **临时解决方案**  
   - 如果服务崩溃频繁，可以配置Nginx重试机制或超时时间：
     ```nginx
     location /api/ {
         proxy_pass http://127.0.0.1:8000;
         proxy_read_timeout 60s;  # 默认60秒可能过短
         proxy_next_upstream error timeout http_500;
     }
     ```

---

### **常见根本原因**
- **应用Bug**：上游服务对特定请求（如`/model/info`）处理时崩溃。
- **依赖服务故障**：如数据库连接超时、GPU推理服务挂起。
- **资源不足**：内存泄漏导致OOM Killer终止进程。
- **配置错误**：服务绑定到错误IP或端口。

需要结合上游服务的日志进一步分析。如果是Python应用，可以检查是否捕获了全局异常，或者是否有第三方库（如PyTorch/TensorFlow）因资源问题崩溃。







[4016034.541336] [1463553]     0 1463553    10427      905   118784        0             0 tat_agent
[4016034.541339] [3385641]     0 3385641     2121      228    57344        0             0 crond
[4016034.541342] [3402530]     0 3402530     3967      351    77824        0         -1000 sshd
[4016034.541344] [3409101]     0 3409101     8016      427    86016        0         -1000 systemd-udevd
[4016034.541346] [3409102]     0 3409102    16479      300   172032        0          -250 systemd-journal
[4016034.541349] [3410244]     0 3410244   450593     3879   294912        0          -999 containerd
[4016034.541351] [3410255]     0 3410255   582013     9317   663552        0          -500 dockerd
[4016034.541354] [3576608]     0 3576608     2067      385    53248        0             0 bash
[4016034.541356] [3576678]     0 3576678     2067      374    61440        0             0 bash
[4016034.541360] [3609160]     0 3609160     2580      281    53248        0             0 nginx
[4016034.541362] [3609161]   993 3609161     2714      348    57344        0             0 nginx
[4016034.541364] [3609163]   993 3609163     2714      360    57344        0             0 nginx
[4016034.541367] [3610086]     0 3610086   309524     1191   118784        0          -998 containerd-shim
[4016034.541369] [3610113]     0 3610113  1198619   337723  3850240        0             0 uvicorn
[4016034.541371] [3610147]     0 3610147   417822      238   143360        0          -500 docker-proxy
[4016034.541373] [3610153]     0 3610153   399389      243   143360        0          -500 docker-proxy
[4016034.541375] [3610857]     0 3610857   443409     1990   229376        0             0 docker
[4016034.541377] [3610876]     0 3610876      645       11    45056        0             0 sh
[4016034.541379] [3610882]     0 3610882     4994      336    81920        0             0 curl
[4016034.541382] [3610933]     0 3610933     4994      323    81920        0             0 curl
[4016034.541383] oom-kill:constraint=CONSTRAINT_NONE,nodemask=(null),cpuset=containerd.service,mems_allowed=0,global_oom,task_memcg=/system.slice/docker-【容器ID已脱敏】.scope,task=uvicorn,pid=3610113,uid=0
[4016034.541405] Out of memory: Killed process 3610113 (uvicorn) total-vm:4794476kB, anon-rss:1350640kB, file-rss:252kB, shmem-rss:0kB, UID:0 pgtables:3760kB oom_score_adj:0
[4016035.103260] 【网络标识符已脱敏】: port 1(【虚拟网络接口已脱敏】) entered disabled state
[4016035.105202] 【虚拟网络接口已脱敏】: renamed from eth0
[4016035.125791] 【网络标识符已脱敏】: port 1(【虚拟网络接口已脱敏】) entered disabled state
[4016035.126056] 【虚拟网络接口已脱敏】 (unregistering): left allmulticast mode
[4016035.126060] 【虚拟网络接口已脱敏】 (unregistering): left promiscuous mode
[4016035.126062] 【网络标识符已脱敏】: port 1(【虚拟网络接口已脱敏】) entered disabled state
[4016035.332542] 【网络标识符已脱敏】: port 1(【虚拟网络接口已脱敏】) entered blocking state
[4016035.332546] 【网络标识符已脱敏】: port 1(【虚拟网络接口已脱敏】) entered disabled state
[4016035.332565] 【虚拟网络接口已脱敏】: entered allmulticast mode
[4016035.332606] 【虚拟网络接口已脱敏】: entered promiscuous mode
[4016035.332706] 【网络标识符已脱敏】: port 1(【虚拟网络接口已脱敏】) entered blocking state
[4016035.332709] 【网络标识符已脱敏】: port 1(【虚拟网络接口已脱敏】) entered forwarding state
[4016035.354919] eth0: renamed from 【虚拟网络接口已脱敏】







从日志中可以明确看到，系统触发了 **OOM Killer（Out-Of-Memory Killer）**，并杀死了 `uvicorn` 进程（PID `3610113`），导致上游服务崩溃，进而引发 Nginx 报错 `upstream prematurely closed connection`。以下是详细分析：

---

### **关键日志解析**
1. **OOM Killer 触发**  
   ```plaintext
   oom-kill:constraint=CONSTRAINT_NONE,nodemask=(null),cpuset=containerd.service,mems_allowed=0,global_oom,task_memcg=/system.slice/docker-【容器ID已脱敏】.scope,task=uvicorn,pid=3610113,uid=0
   Out of memory: Killed process 3610113 (uvicorn) total-vm:4794476kB, anon-rss:1350640kB, file-rss:252kB, shmem-rss:0kB, UID:0 pgtables:3760kB oom_score_adj:0
   ```
   - 进程 `uvicorn`（PID `3610113`）因内存不足被系统强制终止。
   - 该进程占用了约 **4.8GB 虚拟内存（total-vm）** 和 **1.35GB 实际内存（anon-rss）**。
   - 该进程属于 Docker 容器（`task_memcg=/system.slice/docker-xxx.scope`）。

2. **进程列表分析**  
   - `uvicorn` 是 Python 的 ASGI 服务器（通常用于 FastAPI、Django 等），内存占用异常高（`1198619` 单位可能是内存页数，换算后约 1.2GB RSS）。
   - 其他进程（如 `nginx`、`docker`、`containerd`）内存占用正常。
   - 系统可能未配置足够的交换分区（Swap），导致物理内存耗尽时直接触发 OOM Killer。

3. **网络接口变化**  
   - Docker 网络接口因容器崩溃被重新配置（`vethXXX` 设备变化），这是容器重启的副作用。

---

### **根本原因**
1. **内存不足**  
   - `uvicorn` 进程（或容器内应用）内存泄漏，或单次请求占用内存过高（如大模型加载、大数据处理）。
   - 系统物理内存 + Swap 不足，无法满足服务需求。

2. **上游服务崩溃的连锁反应**  
   - `uvicorn` 被杀死后，Nginx 无法从上游服务（`127.0.0.1:8000`）获取响应，报错 `upstream prematurely closed connection`。
   - Nginx 尝试切换到 IPv6（`[::1]:8000`）和其他 Worker，但服务已完全崩溃。

---

### **解决方案**
#### 1. **紧急措施**
- **重启服务**：  
  ```bash
  # 重启 Docker 容器（如果使用容器）
  docker restart <container_name>

  # 或者直接重启 uvicorn 服务
  systemctl restart your-uvicorn-service
  ```

- **释放内存**：  
  ```bash
  sync; echo 3 > /proc/sys/vm/drop_caches  # 清理缓存（临时缓解）
  ```

#### 2. **长期优化**
- **增加系统内存或 Swap**  
  ```bash
  # 添加 Swap 文件（例如 4GB）
  sudo fallocate -l 4G /swapfile
  sudo chmod 600 /swapfile
  sudo mkswap /swapfile
  sudo swapon /swapfile
  echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
  ```

- **限制容器内存**  
  在 `docker-compose.yml` 或 `docker run` 中限制内存：  
  ```yaml
  services:
    your-app:
      mem_limit: 2g  # 限制容器最大内存为 2GB
  ```

- **优化应用内存使用**  
  - 检查代码中的内存泄漏（如全局变量堆积、大文件未流式处理）。
  - 减少模型加载的冗余副本（如共享内存）。
  - 使用 `gunicorn` + `uvicorn` 限制 Worker 数量：  
    ```bash
    gunicorn -w 2 -k uvicorn.workers.UvicornWorker 【应用入口xx:xx已脱敏】
    ```

- **监控与告警**  
  ```bash
  # 安装监控工具（如 htop、prometheus）
  htop  # 实时查看内存使用
  ```

#### 3. **Nginx 容错配置**
```nginx
location /api/ {
    proxy_pass http://127.0.0.1:8000;
    proxy_read_timeout 120s;
    proxy_next_upstream error timeout http_500 http_502 http_503 http_504;
}
```

---

### **验证步骤**
1. 检查当前内存和 Swap 使用情况：
   ```bash
   free -h
   ```

2. 查看 OOM Killer 历史记录：
   ```bash
   dmesg | grep -i oom
   ```

3. 监控服务内存占用：
   ```bash
   watch -n 1 "ps aux | grep uvicorn"
   ```

如果问题持续，需进一步分析应用代码或模型加载逻辑。







