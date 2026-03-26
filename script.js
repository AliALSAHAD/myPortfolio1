const siteConfig = {
  availableForWork: true,
  availableText: "متوفر للعمل",
  unavailableText: "غير متوفر حالياً"
};

const body = document.body;
const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const themeToggle = document.getElementById("themeToggle");
const topLoader = document.getElementById("topLoader");
const wordTrack = document.getElementById("wordTrack");
const progressFills = document.querySelectorAll(".progress-fill");
const revealElements = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section[id]");
const availabilityText = document.getElementById("availabilityText");

window.addEventListener("load", () => {
  setTimeout(() => topLoader.classList.add("hidden"), 1200);
});

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "dark") body.classList.add("dark");

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  localStorage.setItem("portfolio-theme", body.classList.contains("dark") ? "dark" : "light");
});

availabilityText.textContent = siteConfig.availableForWork ? siteConfig.availableText : siteConfig.unavailableText;

menuToggle.addEventListener("click", () => navbar.classList.toggle("open"));
navLinks.forEach(link => link.addEventListener("click", () => navbar.classList.remove("open")));

function handleNavbarScroll() {
  navbar.classList.toggle("compact", window.scrollY > 24);
}
handleNavbarScroll();
window.addEventListener("scroll", handleNavbarScroll, { passive: true });

let wordIndex = 0;
const totalWords = wordTrack.children.length;
setInterval(() => {
  wordIndex = (wordIndex + 1) % totalWords;
  wordTrack.style.transform = `translateY(-${wordIndex * 1.2}em)`;
}, 2300);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add("visible"); revealObserver.unobserve(entry.target); }
  });
}, { threshold: 0.14 });
revealElements.forEach((el) => revealObserver.observe(el));

const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.width = `${entry.target.dataset.progress}%`;
      progressObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.35 });
progressFills.forEach((fill) => progressObserver.observe(fill));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute("id");
      navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${id}`));
    }
  });
}, { threshold: 0.45 });
sections.forEach((section) => sectionObserver.observe(section));

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (!targetId || targetId === "#") return;
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;
    e.preventDefault();
    window.scrollTo({ top: targetElement.getBoundingClientRect().top + window.pageYOffset - 112, behavior: "smooth" });
  });
});

// Timeline logo upload
const timelineInput = document.getElementById("timelineLogoInput");
const timelineImg = document.getElementById("timelineLogoImg");
const timelineLabel = document.getElementById("timelineLogoLabel");

if (timelineInput && timelineImg && timelineLabel) {
  timelineInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      timelineImg.src = event.target.result;
      timelineImg.style.display = "block";
      timelineLabel.style.display = "none";
    };
    reader.readAsDataURL(file);
  });
}
// تشغيل أنميشن التيرمينال
document.addEventListener("DOMContentLoaded", () => {
  const text1 = "whoami";
  const text2 = "cat skills.txt";
  
  const el1 = document.getElementById('term-text-1');
  const out1 = document.getElementById('term-out-1');
  const line2 = document.getElementById('term-line-2');
  const el2 = document.getElementById('term-text-2');
  const out2 = document.getElementById('term-out-2');
  const line3 = document.getElementById('term-line-3');

  if (!el1) return;

  let i = 0;
  function typeCommand1() {
    if (i < text1.length) {
      el1.textContent += text1.charAt(i);
      i++;
      setTimeout(typeCommand1, 120);
    } else {
      setTimeout(() => {
        out1.style.display = 'block';
        line2.style.display = 'block';
        setTimeout(startCommand2, 600);
      }, 300);
    }
  }

  let j = 0;
  function startCommand2() {
    function typeCommand2() {
      if (j < text2.length) {
        el2.textContent += text2.charAt(j);
        j++;
        setTimeout(typeCommand2, 120);
      } else {
        setTimeout(() => {
          out2.style.display = 'block';
          line3.style.display = 'block';
        }, 300);
      }
    }
    typeCommand2();
  }

  const termObserver = new IntersectionObserver((entries) => {
    if(entries[0].isIntersecting) {
      setTimeout(typeCommand1, 500);
      termObserver.disconnect();
    }
  }, { threshold: 0.2 });
  
  const termContainer = document.querySelector('.terminal-container');
  if(termContainer) termObserver.observe(termContainer);
});
// تفعيل تأثير الـ 3D Tilt على الكروت
document.addEventListener("DOMContentLoaded", () => {
  const tiltCards = document.querySelectorAll(".skill-card, .glass-card, .work-card, .certificate-card, .contact-card");

  tiltCards.forEach(card => {
    card.addEventListener("mousemove", handleTilt);
    card.addEventListener("mouseout", resetTilt);
  });

  function handleTilt(e) {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const width = box.width;
    const height = box.height;

    // حساب نسبة الميل (كل ما قرب الماوس من الحافة زاد الميل)
    const rotateX = ((y / height) - 0.5) * -12; // درجة الميل الأفقي (جرب تغيير -12 لزيادة/تقليل التأثير)
    const rotateY = ((x / width) - 0.5) * 12;  // درجة الميل العمودي (جرب تغيير 12 لزيادة/تقليل التأثير)

    // تطبيق الميل والتحريك خفيف (Perspective لجعل التأثير ثلاثي الأبعاد)
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    
    // تحريك اللمعة (Glare)
    const glareX = (x / width) * 100;
    const glareY = (y / height) * 100;
    card.style.setProperty('--glare-x', `${glareX}%`);
    card.style.setProperty('--glare-y', `${glareY}%`);
    card.style.backgroundPosition = `${glareX}% ${glareY}%`;
  }

  function resetTilt(e) {
    const card = e.currentTarget;
    // إعادة البطاقة لوضعها الطبيعي بنعومة عند خروج الماوس
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    card.style.backgroundPosition = 'center';
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById('chatbotContainer');
  const toggler = document.getElementById('chatbotToggler');
  const body = document.getElementById('chatbotBody');
  const inputArea = document.querySelector('.chatbot-footer'); // سنخفيه أو نعدله

  // 1. تعريف الأسئلة والأجوبة
  const botData = {
    "من أنت؟": "أنا المساعد الذكي لعلي الصهد، صُممت لأجيبك على استفساراتك حول خبراته ومجالات عمله.",
    "ماهي مهاراتك؟": "علي متخصص في الأمن السيبراني (اختبار الاختراق، أمن الشبكات) والذكاء الاصطناعي، بالإضافة لخبرته الإبداعية في التصميم الجرافيكي.",
    "كيف أتواصل معك؟": "يسعد علي تواصلك معه عبر البريد الإلكتروني أو LinkedIn. يمكنك العثور على الروابط المباشرة في أسفل الصفحة.",
    "أين تدرس؟": "علي طالب في جامعة الملك سعود، تخصص علوم حاسب (مسار شبكات)."
  };

  // 2. دالة لإضافة رسالة البوت مع الخيارات
  function botReply(text) {
    // إضافة نص الرد
    const botDiv = document.createElement('div');
    botDiv.classList.add('message', 'bot-message');
    botDiv.textContent = text;
    body.appendChild(botDiv);
    
    // إضافة الأزرار (الخيارات)
    showOptions();
    scrollToBottom();
  }

  // 3. دالة لإنشاء أزرار الخيارات
  function showOptions() {
    const optionsDiv = document.createElement('div');
    optionsDiv.style.display = "flex";
    optionsDiv.style.flexWrap = "wrap";
    optionsDiv.style.gap = "8px";
    optionsDiv.style.marginTop = "10px";

    Object.keys(botData).forEach(question => {
      const btn = document.createElement('button');
      btn.textContent = question;
      btn.style.cssText = `
        background: var(--surface-strong);
        border: 1px solid var(--border);
        padding: 8px 14px;
        border-radius: 20px;
        cursor: pointer;
        font-size: 0.85rem;
        color: var(--text);
        transition: all 0.2s ease;
      `;
      
      btn.onmouseover = () => btn.style.background = "var(--border)";
      btn.onmouseout = () => btn.style.background = "var(--surface-strong)";
      
      btn.onclick = () => {
        handleUserChoice(question);
        // حذف الأزرار بعد الاختيار لمنع التكرار
        optionsDiv.remove();
      };
      
      optionsDiv.appendChild(btn);
    });
    
    body.appendChild(optionsDiv);
  }

  // 4. معالجة اختيار المستخدم
  function handleUserChoice(question) {
    // إظهار اختيار المستخدم كرسالة
    const userDiv = document.createElement('div');
    userDiv.classList.add('message', 'user-message');
    userDiv.textContent = question;
    body.appendChild(userDiv);
    scrollToBottom();

    // رد البوت بعد ثانية
    setTimeout(() => {
      botReply(botData[question]);
    }, 800);
  }

  function scrollToBottom() {
    body.scrollTop = body.scrollHeight;
  }

  // تشغيل البوت عند الفتح لأول مرة
  toggler.addEventListener('click', () => {
    container.classList.toggle('open');
    if (container.classList.contains('open') && body.children.length <= 1) {
      setTimeout(() => showOptions(), 500);
    }
  });

  // إخفاء منطقة الكتابة لأننا بنعتمد على الخيارات
  if (inputArea) inputArea.style.display = "none";
});

// ابحث عن هذا السطر وعدله
const tiltCards = document.querySelectorAll(".skill-card, .glass-card, .work-card, .certificate-card, .contact-card, .ctf-card");

// === كود تفعيل الاختراق عبر زر الفيروس ===
document.addEventListener("DOMContentLoaded", () => {
    const virusBtn = document.getElementById('virusButton');
    const statusText = document.getElementById('activationStatus');

    if (virusBtn) {
        virusBtn.addEventListener('click', () => {
            // تبديل الكلاس المسؤول عن الوضع
            document.body.classList.toggle("hacker-mode");

            // تحديث الرسالة تحت الزر
            if (document.body.classList.contains("hacker-mode")) {
                statusText.innerHTML = '<p class="pixel-text-ar" style="color:#00ff41 !important;">تم اختراق النظام بنجاح! 💀</p>';
                console.log("ALERT: Unauthorized Access Detected.");
            } else {
                statusText.innerHTML = '<p class="pixel-text-ar">حاول الضغط على شعار الفيروس...</p>';
                console.log("SYSTEM: Security Patched.");
            }
        });
    }
});

// === برمجة التيرمنال التفاعلي للـ Portfolio ===
const terminalInput = document.getElementById('terminalInput');
const terminalOutput = document.getElementById('terminalOutput');
const terminalBody = document.getElementById('terminalBody');

// قائمة الأوامر المتاحة
const commands = {
    'whoami': '> CS_Student | Cybersecurity_Enthusiast | Graphic_Designer',
    'skills': '[+] Network Security\n[+] Penetration Testing\n[+] Python & Java\n[+] Web Development',
    'contact': 'Email: ali.taha.alsahad.696@gmail.com\nX: @AliAlsahad',
    'help': 'الأوامر المتاحة: whoami, skills, contact, clear\nأمر سري: جرب تكتب sudo hack',
    'clear': ''
};

// التركيز على مربع الكتابة بمجرد الضغط على أي مكان في التيرمنال
if(terminalBody && terminalInput) {
    terminalBody.addEventListener('click', () => terminalInput.focus());

    terminalInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const cmd = this.value.trim().toLowerCase();
            
            // طباعة السطر اللي كتبه الزائر
            const cmdLine = document.createElement('div');
            cmdLine.innerHTML = `<span class="prompt">ali@alsahad:~$</span> ${this.value}`;
            terminalOutput.appendChild(cmdLine);

            // تنفيذ الأوامر
            if (cmd === 'clear') {
                terminalOutput.innerHTML = '';
            } else if (cmd === 'sudo hack') {
                // الأمر السري: يشغل وضع الهاكر تلقائياً!
                document.body.classList.add("hacker-mode");
                const response = document.createElement('div');
                response.style.color = '#00ff41';
                response.textContent = 'Access Granted. Welcome to the Matrix...';
                terminalOutput.appendChild(response);
            } else if (cmd !== '') {
                const response = document.createElement('div');
                response.style.whiteSpace = 'pre-wrap';
                response.style.marginBottom = '12px';
                response.style.opacity = '0.9';
                
                // البحث عن الأمر أو طباعة خطأ
                response.textContent = commands[cmd] || `bash: ${cmd}: command not found`;
                terminalOutput.appendChild(response);
            }

            // تنظيف مربع الكتابة والنزول لأسفل
            this.value = '';
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
    });
}

