/* ==========================================================================
   Tarek Okasha — portfolio behaviour
   No framework. Every effect degrades to a fully readable page without it.
   ========================================================================== */

(function () {
  'use strict';

  var reduced =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canHover = window.matchMedia && window.matchMedia('(hover: hover)').matches;
  var hasIO = 'IntersectionObserver' in window;

  var $ = function (sel, root) {
    return (root || document).querySelector(sel);
  };
  var $$ = function (sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  };
  var accent = function () {
    return (
      getComputedStyle(document.documentElement).getPropertyValue('--ac').trim() || '#FF4A1C'
    );
  };

  /* ------------------------------------------------------------------ Clock */

  function startClock() {
    var el = $('[data-clock]');
    if (!el) return;
    var fmt;
    try {
      fmt = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Africa/Cairo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
    } catch (e) {
      fmt = null;
    }
    var tick = function () {
      el.textContent = fmt
        ? fmt.format(new Date()) + ' CLT'
        : new Date().toLocaleTimeString();
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ----------------------------------------------------------------- Reveal */

  function setupReveal() {
    if (reduced || !hasIO) return;
    var vh = window.innerHeight;

    // Only hide what is still below the fold — anything already on screen
    // stays painted, so the first frame is never blank.
    var nodes = $$('[data-reveal]').filter(function (n) {
      return n.getBoundingClientRect().top > vh * 0.9;
    });
    nodes.forEach(function (n) {
      n.classList.add('js-reveal');
    });

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var parent = e.target.parentElement;
          var siblings = parent
            ? Array.prototype.filter.call(parent.children, function (c) {
                return c.hasAttribute && c.hasAttribute('data-reveal');
              })
            : [];
          var i = Math.max(0, siblings.indexOf(e.target));
          e.target.style.transitionDelay = Math.min(i * 70, 350) + 'ms';
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -8% 0px' }
    );
    nodes.forEach(function (n) {
      io.observe(n);
    });

    // Safety net: never leave content hidden if an observer misfires.
    setTimeout(function () {
      nodes.forEach(function (n) {
        n.classList.add('is-in');
      });
    }, 6000);
  }

  /* ------------------------------------------------------------------ Wipes */

  function setupWipes() {
    if (reduced || !hasIO) return;
    var vh = window.innerHeight;
    var nodes = $$('[data-wipe]').filter(function (n) {
      return n.getBoundingClientRect().top > vh * 0.88;
    });
    if (!nodes.length) return;
    nodes.forEach(function (n) {
      n.classList.add('js-wipe');
    });

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        });
      },
      { threshold: 0.15 }
    );
    nodes.forEach(function (n) {
      io.observe(n);
    });

    setTimeout(function () {
      nodes.forEach(function (n) {
        n.classList.add('is-in');
      });
    }, 7000);
  }

  /* --------------------------------------------------------------- Counters */

  function setupCounters() {
    if (reduced || !hasIO) return;
    var nodes = $$('[data-count]');
    if (!nodes.length) return;

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          var el = e.target;
          // Keep the original markup — some values carry an accent-coloured
          // suffix in a nested span that plain-text restore would flatten.
          var html = el.innerHTML;
          var m = /^([\d,]+(?:\.\d+)?)(.*)$/.exec(el.textContent.trim());
          if (!m) return;
          var target = parseFloat(m[1].replace(/,/g, ''));
          if (!isFinite(target) || target <= 0) return;
          var decimals = (m[1].split('.')[1] || '').length;
          var grouped = m[1].indexOf(',') > -1;
          var suffix = m[2];
          var t0 = performance.now();
          var dur = 1100;

          var step = function (now) {
            var k = Math.min(1, (now - t0) / dur);
            var v = target * (1 - Math.pow(1 - k, 3));
            var s = v.toFixed(decimals);
            if (grouped) s = Number(s).toLocaleString('en-US');
            if (k < 1) {
              el.textContent = s + suffix;
              requestAnimationFrame(step);
            } else {
              el.innerHTML = html;
            }
          };
          el.textContent = '0' + suffix;
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.5 }
    );
    nodes.forEach(function (n) {
      io.observe(n);
    });
  }

  /* --------------------------------------------------------------- Magnetic */

  function setupMagnetic() {
    if (reduced || !canHover) return;
    $$('[data-mag]').forEach(function (el) {
      el.addEventListener('pointermove', function (ev) {
        var r = el.getBoundingClientRect();
        var dx = ev.clientX - (r.left + r.width / 2);
        var dy = ev.clientY - (r.top + r.height / 2);
        el.style.transform =
          'translate3d(' + (dx * 0.22).toFixed(1) + 'px,' + (dy * 0.34).toFixed(1) + 'px,0)';
      });
      el.addEventListener('pointerleave', function () {
        el.style.transform = '';
      });
    });
  }

  /* ------------------------------------------------------- "View live" chip */

  function setupFollow() {
    var chip = $('[data-chip]');
    if (!chip || reduced || !canHover) return;
    var on = false;
    var move = function (ev) {
      chip.style.transform =
        'translate3d(' +
        (ev.clientX + 18) +
        'px,' +
        (ev.clientY - 20) +
        'px,0) scale(' +
        (on ? 1 : 0.7) +
        ')';
    };
    $$('[data-row][href]').forEach(function (row) {
      row.addEventListener('pointerenter', function () {
        on = true;
        chip.style.opacity = '1';
      });
      row.addEventListener('pointerleave', function () {
        on = false;
        chip.style.opacity = '0';
      });
      row.addEventListener('pointermove', move);
    });
  }

  /* ------------------------------ Scroll progress + active section in the nav */

  function setupScroll() {
    var bar = $('[data-progress]');
    var ids = ['capabilities', 'work', 'brands', 'about'];
    var links = ids
      .map(function (id) {
        return [id, $('.masthead__nav a[href="#' + id + '"]')];
      })
      .filter(function (pair) {
        return pair[1];
      });

    var onScroll = function () {
      if (bar) {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0) + '%';
      }
      var active = null;
      ids.forEach(function (id) {
        var el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 170) active = id;
      });
      links.forEach(function (pair) {
        pair[1].classList.toggle('is-active', pair[0] === active);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ------------------------------------------- Marquee drift + hero parallax */

  function setupMotion() {
    var marq = $('[data-marq]');
    var hold = false;
    if (marq) {
      marq.addEventListener('pointerenter', function () {
        hold = true;
      });
      marq.addEventListener('pointerleave', function () {
        hold = false;
      });
    }
    if (reduced) return;

    var hero = $('[data-hero]');
    var stage = $('[data-stage]');
    var ready = false;

    // The entrance keyframes use fill:both, which pins transform. Hand the
    // elements over to the scroll loop only once those have finished.
    setTimeout(function () {
      [hero, stage].forEach(function (el) {
        if (!el) return;
        el.style.animation = 'none';
        el.style.opacity = '1';
        el.style.willChange = 'transform';
      });
      ready = true;
    }, 1500);

    var last = window.scrollY;
    var vel = 0;
    var marqX = 0;

    var tick = function () {
      var y = window.scrollY;
      vel = vel * 0.82 + (y - last) * 0.18;
      last = y;

      if (marq) {
        var half = marq.scrollWidth / 2;
        if (half > 0) {
          var drift = hold ? 0 : 0.85 + Math.min(Math.abs(vel) * 0.55, 16);
          marqX -= vel < -1.2 ? -drift : drift;
          if (marqX <= -half) marqX += half;
          if (marqX > 0) marqX -= half;
          marq.style.transform = 'translate3d(' + marqX.toFixed(2) + 'px,0,0)';
        }
      }

      if (ready) {
        var p = Math.max(0, Math.min(1, y / (window.innerHeight * 0.9)));
        if (hero) {
          hero.style.transform = 'translate3d(0,' + (p * -70).toFixed(1) + 'px,0)';
          hero.style.opacity = (1 - p * 0.85).toFixed(3);
        }
        if (stage) {
          stage.style.transform = 'translate3d(0,' + (p * 46).toFixed(1) + 'px,0)';
          stage.style.opacity = (1 - p * 0.7).toFixed(3);
        }
      }
      requestAnimationFrame(tick);
    };
    tick();
  }

  /* ----------------------------------------------------------- Wordmark fit */

  function fitWordmark() {
    var el = $('[data-wordmark]');
    if (!el || !el.parentElement) return;
    var fit = function () {
      var avail = el.parentElement.clientWidth;
      if (!avail) return;
      el.style.fontSize = '100px';
      var w = el.offsetWidth;
      if (!w) return;
      el.style.fontSize = (100 * (avail / w) * 0.998).toFixed(2) + 'px';
    };
    fit();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
    window.addEventListener('resize', fit);
  }

  /* --------------------------------------------------------- Copy the email */

  function setupCopy() {
    var btn = $('[data-copy]');
    if (!btn) return;
    var timer;
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var address = btn.getAttribute('data-copy');
      var done = function () {
        btn.textContent = 'Copied';
        btn.classList.add('is-copied');
        clearTimeout(timer);
        timer = setTimeout(function () {
          btn.textContent = 'Copy';
          btn.classList.remove('is-copied');
        }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(address).then(done).catch(done);
      } else {
        done();
      }
    });
  }

  /* ------------------------------------------------------------- Robot arm
     Three-link planar manipulator solved with cyclic coordinate descent.
     Idles on a Lissajous path; tracks the pointer when there is one.
     ---------------------------------------------------------------------- */

  function startArm() {
    var cv = $('[data-arm]');
    if (!cv) return;
    var ctx = cv.getContext('2d');
    if (!ctx) return;

    var tel = $('[data-telemetry]');
    var ink = '#0E0E0F';
    var bone = '#EDE9E2';
    var W = 0;
    var H = 0;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var ang = [-1.05, 0.95, 0.55];
    var t = 0;
    var mouse = null;
    var lastMove = 0;
    var grip = 0;
    var pulse = 0;
    var frame = 0;
    var trail = [];

    var draw; // defined below; referenced by resize()

    var resize = function () {
      var r = cv.getBoundingClientRect();
      W = r.width;
      H = r.height;
      // Assigning width/height wipes the bitmap. The animated path repaints
      // on the next frame anyway, but the reduced-motion path draws once —
      // so it has to be told to draw again after every resize.
      cv.width = Math.max(1, Math.round(W * dpr));
      cv.height = Math.max(1, Math.round(H * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduced && draw) requestAnimationFrame(draw);
    };
    resize();
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(cv);
    else window.addEventListener('resize', resize);

    if (!reduced) {
      window.addEventListener(
        'pointermove',
        function (e) {
          var r = cv.getBoundingClientRect();
          if (r.width === 0) return;
          mouse = { x: e.clientX - r.left, y: e.clientY - r.top };
          lastMove = performance.now();
        },
        { passive: true }
      );
      window.addEventListener(
        'pointerdown',
        function () {
          grip = 1;
          pulse = 1;
        },
        { passive: true }
      );
    }

    // Forward kinematics: joint angles are cumulative along the chain.
    var fk = function (bx, by, L) {
      var x = bx;
      var y = by;
      var a = 0;
      var pts = [{ x: x, y: y }];
      for (var i = 0; i < 3; i++) {
        a += ang[i];
        x += Math.cos(a) * L[i];
        y += Math.sin(a) * L[i];
        pts.push({ x: x, y: y });
      }
      return pts;
    };

    var limits = [
      [-2.7, -0.15],
      [-0.15, 2.5],
      [-2.0, 2.0],
    ];

    var solve = function (bx, by, L, tx, ty) {
      for (var it = 0; it < 9; it++) {
        for (var i = 2; i >= 0; i--) {
          var p = fk(bx, by, L);
          var j = p[i];
          var e = p[3];
          var d = Math.atan2(ty - j.y, tx - j.x) - Math.atan2(e.y - j.y, e.x - j.x);
          while (d > Math.PI) d -= Math.PI * 2;
          while (d < -Math.PI) d += Math.PI * 2;
          ang[i] = Math.max(limits[i][0], Math.min(limits[i][1], ang[i] + d * 0.36));
        }
      }
    };

    // Each link is an ink stroke with a lighter core, so segments read as
    // outlined tubing rather than solid bars.
    var link = function (a, b, w) {
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = ink;
      ctx.lineWidth = w;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
      ctx.strokeStyle = bone;
      ctx.lineWidth = Math.max(1, w - 5.5);
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    };

    draw = function () {
      t += 0.01;
      ctx.clearRect(0, 0, W, H);
      if (W < 10 || H < 10) {
        requestAnimationFrame(draw);
        return;
      }

      var ac = accent();
      var s = Math.min(W / 470, H / 470);
      var bx = W * 0.46;
      var by = H * 0.9;
      var L = [150 * s, 122 * s, 62 * s];
      var reach = L[0] + L[1] + L[2];

      var idle = !mouse || performance.now() - lastMove > 2200;
      var tx;
      var ty;
      if (idle) {
        tx = bx + Math.cos(t * 0.9) * reach * 0.52;
        ty = by - reach * 0.55 + Math.sin(t * 1.8) * reach * 0.2;
      } else {
        tx = mouse.x;
        ty = mouse.y;
      }
      var dx = tx - bx;
      var dy = ty - by;
      var dist = Math.hypot(dx, dy);
      if (dist > reach * 0.96) {
        tx = bx + (dx / dist) * reach * 0.96;
        ty = by + (dy / dist) * reach * 0.96;
      }
      if (ty > by - 8) ty = by - 8;

      solve(bx, by, L, tx, ty);
      var p = fk(bx, by, L);
      var ee = p[3];

      // Reach envelope + base rail
      ctx.strokeStyle = 'rgba(14,14,15,0.13)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 6]);
      ctx.beginPath();
      ctx.arc(bx, by, reach * 0.96, Math.PI, 0);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.strokeStyle = 'rgba(14,14,15,0.2)';
      ctx.beginPath();
      ctx.moveTo(bx - reach * 0.98, by);
      ctx.lineTo(bx + reach * 0.98, by);
      ctx.stroke();

      // End-effector trail
      trail.push({ x: ee.x, y: ee.y });
      if (trail.length > 64) trail.shift();
      for (var i = 1; i < trail.length; i++) {
        ctx.strokeStyle = 'rgba(14,14,15,' + (i / trail.length) * 0.22 + ')';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
        ctx.lineTo(trail[i].x, trail[i].y);
        ctx.stroke();
      }

      // Target crosshair
      ctx.strokeStyle = ac;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(tx, ty, 13 * s + 2, 0, Math.PI * 2);
      ctx.stroke();
      if (grip > 0.6) {
        ctx.fillStyle = ac;
        ctx.globalAlpha = (grip - 0.6) / 0.4;
        ctx.beginPath();
        ctx.arc(tx, ty, 4.5 * s, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      ctx.beginPath();
      ctx.moveTo(tx - 20 * s, ty);
      ctx.lineTo(tx - 7 * s, ty);
      ctx.moveTo(tx + 7 * s, ty);
      ctx.lineTo(tx + 20 * s, ty);
      ctx.moveTo(tx, ty - 20 * s);
      ctx.lineTo(tx, ty - 7 * s);
      ctx.moveTo(tx, ty + 7 * s);
      ctx.lineTo(tx, ty + 20 * s);
      ctx.stroke();

      // Pedestal
      ctx.fillStyle = ink;
      ctx.beginPath();
      ctx.moveTo(bx - 40 * s, by);
      ctx.lineTo(bx + 40 * s, by);
      ctx.lineTo(bx + 26 * s, by - 22 * s);
      ctx.lineTo(bx - 26 * s, by - 22 * s);
      ctx.closePath();
      ctx.fill();

      link(p[0], p[1], 26 * s);
      link(p[1], p[2], 21 * s);
      link(p[2], p[3], 15 * s);

      // Joints
      [p[0], p[1], p[2]].forEach(function (j, k) {
        var r = (13 - k * 2) * s;
        ctx.fillStyle = bone;
        ctx.beginPath();
        ctx.arc(j.x, j.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = ink;
        ctx.lineWidth = 2.6;
        ctx.stroke();
        ctx.fillStyle = ac;
        ctx.beginPath();
        ctx.arc(j.x, j.y, r * 0.34, 0, Math.PI * 2);
        ctx.fill();
      });

      // Gripper — closes as the end effector converges on the target
      var wa = ang[0] + ang[1] + ang[2];
      var err = Math.hypot(ee.x - tx, ee.y - ty);
      var closed = 1 - Math.max(0, Math.min(1, (err - 5) / 85));
      grip += (closed - grip) * 0.16;
      var open = (2.5 + (1 - grip) * 9) * s;
      var nx = -Math.sin(wa);
      var ny = Math.cos(wa);
      ctx.strokeStyle = ink;
      ctx.lineWidth = 4 * s;
      ctx.lineCap = 'round';
      [-1, 1].forEach(function (sgn) {
        var ax = ee.x + nx * open * sgn;
        var ay = ee.y + ny * open * sgn;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(ax + Math.cos(wa) * 15 * s, ay + Math.sin(wa) * 15 * s);
        ctx.stroke();
      });

      if (pulse > 0.02) {
        ctx.strokeStyle = ac;
        ctx.globalAlpha = pulse;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(tx, ty, 10 * s + (1 - pulse) * 52 * s, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
        pulse *= 0.9;
      }

      frame++;
      if (tel && frame % 4 === 0) {
        var deg = function (a) {
          var v = (a * 180) / Math.PI;
          return (v < 0 ? '-' : '+') + Math.abs(v).toFixed(1).padStart(5, '0');
        };
        tel.textContent =
          'J1 ' + deg(ang[0]) + '°\nJ2 ' + deg(ang[1]) + '°\nJ3 ' + deg(ang[2]) + '°\nGRIP ' +
          Math.round(grip * 100) + '%';
      }

      if (!reduced) requestAnimationFrame(draw);
    };

    draw();
  }

  /* -------------------------------------------------------------- Bootstrap */

  function init() {
    startClock();
    setupReveal();
    setupWipes();
    setupCounters();
    setupMagnetic();
    setupFollow();
    setupScroll();
    setupMotion();
    setupCopy();
    fitWordmark();
    startArm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
