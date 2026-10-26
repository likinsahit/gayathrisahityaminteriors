/**
 * Gayathri Sahityam Interior Designs — Application Script
 * Features:
 * - Header Scroll & Glassmorphism Blur
 * - Mobile Navigation Drawer Controller
 * - Interactive Dwelling Specification Tabs
 * - Concept vs. Built Reality Image Comparison Slider
 * - Architectural Space Modal Viewer
 * - Investment & Scope Project Estimator
 * - WhatsApp Consultation Booking Dialog
 */

// 1. Sticky Header Scroll Detection
    const siteHeader = document.getElementById("siteHeader");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 40) {
        siteHeader.classList.add("scrolled");
      } else {
        siteHeader.classList.remove("scrolled");
      }
    }, { passive: true });

    // 2. Mobile Menu Drawer
    const menuToggle = document.getElementById("menuToggle");
    const mobileDrawer = document.getElementById("mobileDrawer");
    const drawerBackdrop = document.getElementById("drawerBackdrop");
    const drawerClose = document.getElementById("drawerClose");
    const drawerLinks = document.querySelectorAll(".drawer-link");

    function openMobileDrawer() {
      mobileDrawer.classList.add("active");
      lockBodyScroll();
      drawerBackdrop.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    function closeMobileDrawer() {
      mobileDrawer.classList.remove("active");
      unlockBodyScroll();
      drawerBackdrop.classList.remove("active");
      document.body.style.overflow = "";
    }

    menuToggle.addEventListener("click", openMobileDrawer);
    drawerClose.addEventListener("click", closeMobileDrawer);
    drawerBackdrop.addEventListener("click", closeMobileDrawer);
    drawerLinks.forEach(link => link.addEventListener("click", closeMobileDrawer));

    // 3. Dynamic Dwelling Types
    const dwellingData = {
      villas: {
        badge: "Villas & Estates",
        eyebrow: "Grand Spatial Scales",
        title: "Courtyard Villas & Riverfront Havens",
        desc: "Expansive double-height living halls, integrated open courtyards (Manduva Logili), sprawling dining sanctuaries, and private balconies oriented to coastal breezes.",
        img: "assets/images/realistic-villa.png",
        area: "3,500 – 8,500+ sq.ft.",
        feature: "Courtyards & Double Heights",
        time: "90 – 120 Days",
        zoning: "Multi-Generational Luxury"
      },
      individual: {
        badge: "Independent Homes",
        eyebrow: "Rooted Town Living",
        title: "Generational Family Residences",
        desc: "Thoughtfully zoned private and communal realms with Thinnai verandas, teakwood entry portals, dedicated family prayer spaces, and cool-stone flooring.",
        img: "assets/images/realistic-house.png",
        area: "2,200 – 4,800 sq.ft.",
        feature: "Thinnai Verandas & Teak Entry",
        time: "75 – 95 Days",
        zoning: "Family Comfort & Heritage"
      },
      apartments: {
        badge: "Luxury Apartments",
        eyebrow: "Urban Sophistication",
        title: "High-Rise Coastal Penthouses",
        desc: "Space-optimized modern luxury with concealed acoustic cabinetry, seamless open-concept island kitchens, and balcony garden pockets welcoming sea air.",
        img: "assets/images/realistic-apartment.png",
        area: "1,400 – 3,200 sq.ft.",
        feature: "Concealed Storage & Islands",
        time: "45 – 65 Days",
        zoning: "Modern Minimalist Ease"
      }
    };

    const dwellingTabs = document.querySelectorAll(".dwelling-tab");
    const dwellingShowcase = document.getElementById("dwellingShowcase");

    dwellingTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        dwellingTabs.forEach(t => {
          t.classList.remove("active");
          t.setAttribute("aria-selected", "false");
        });
        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");

        const key = tab.dataset.type;
        const data = dwellingData[key];

        // Smooth transition
        dwellingShowcase.style.opacity = "0.3";
        dwellingShowcase.style.transform = "translateY(8px)";

        setTimeout(() => {
          document.getElementById("dwellingImg").src = data.img;
          document.getElementById("dwellingBadge").textContent = data.badge;
          document.getElementById("dwellingEyebrow").textContent = data.eyebrow;
          document.getElementById("dwellingTitle").textContent = data.title;
          document.getElementById("dwellingDesc").textContent = data.desc;
          document.getElementById("dwellingArea").textContent = data.area;
          document.getElementById("dwellingFeature").textContent = data.feature;
          document.getElementById("dwellingTime").textContent = data.time;
          document.getElementById("dwellingZoning").textContent = data.zoning;

          dwellingShowcase.style.opacity = "1";
          dwellingShowcase.style.transform = "none";
        }, 180);
      });
    });

    // 4. Interactive Concept vs Reality Comparison Slider
    const compWidget = document.getElementById("comparisonWidget");
    const compBefore = document.getElementById("comparisonBefore");
    const compSlider = document.getElementById("comparisonSlider");
    const compBeforeImg = document.getElementById("comparisonBeforeImg");

    function updateComparisonWidth() {
      if (compWidget && compBeforeImg) {
        compBeforeImg.style.width = compWidget.offsetWidth + "px";
      }
    }
    window.addEventListener("resize", updateComparisonWidth);
    window.addEventListener("orientationchange", () => setTimeout(updateComparisonWidth, 150));
    window.addEventListener("load", updateComparisonWidth);
    setTimeout(updateComparisonWidth, 100);

    let isSliding = false;

    function setSliderPosition(clientX) {
      const rect = compWidget.getBoundingClientRect();
      let offsetX = clientX - rect.left;
      if (offsetX < 0) offsetX = 0;
      if (offsetX > rect.width) offsetX = rect.width;
      const percentage = (offsetX / rect.width) * 100;

      compBefore.style.width = percentage + "%";
      compSlider.style.left = percentage + "%";
    }

    compWidget.addEventListener("mousedown", (e) => {
      isSliding = true;
      setSliderPosition(e.clientX);
    });

    window.addEventListener("mouseup", () => {
      isSliding = false;
    });

    window.addEventListener("mousemove", (e) => {
      if (!isSliding) return;
      setSliderPosition(e.clientX);
    });

    // Touch support for mobile
    compWidget.addEventListener("touchstart", (e) => {
      isSliding = true;
      setSliderPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener("touchend", () => {
      isSliding = false;
    });

    window.addEventListener("touchmove", (e) => {
      if (!isSliding) return;
      setSliderPosition(e.touches[0].clientX);
    }, { passive: true });

    // 5. Space Details Modal Data
    const spaceData = {
      kitchen: {
        title: "Modern Modular Kitchen",
        eyebrow: "Culinary Ergonomics & Storage",
        img: "assets/images/space-modular-kitchen.png",
        desc: "Designed specifically for Coastal Andhra cooking traditions. Features heavy-duty scratch-resistant acrylic shutters, quartz counters that resist turmeric and oil stains, dedicated pantry tall units, and concealed exhaust channels.",
        materials: "Quartz, Anti-scratch Acrylic, Marine Ply",
        lighting: "Under-cabinet 4000K Task + 3000K Ambient Cove",
        storage: "Tandem box soft-close drawers, spice pullouts, tall pantry",
        timeline: "25 – 30 Days"
      },
      "master-bedroom": {
        title: "Master Suite Sanctuary",
        eyebrow: "Restful & Tactile Elegance",
        img: "assets/images/space-master-bedroom.png",
        desc: "An acoustic haven of calm. Features bespoke fluted wall paneling behind a hand-stitched upholstered bed, integrated nightstand USB/automation controls, and floor-to-ceiling floor-level wardrobes.",
        materials: "Natural Oak, Brushed Brass, Textured Linen",
        lighting: "2700K Dim-to-Warm Cove + Reading Sconces",
        storage: "Full-height fluted closets with internal LED sensors",
        timeline: "20 – 25 Days"
      },
      "childrens-bedroom": {
        title: "Children’s Growth Room",
        eyebrow: "Play, Learn & Dream",
        img: "assets/images/space-childrens-bedroom.png",
        desc: "Adaptive layout designed to grow with your children. Features ergonomic study nooks, rounded safety corners, magnetic pin boards, and resilient non-toxic low-VOC finishes.",
        materials: "Birch Ply, Pastel Laminates, Warm Ash",
        lighting: "Daylight-balanced 4000K Study + Dim Ambient Nightlight",
        storage: "Integrated book ledges, toy drawers, wardrobe zoning",
        timeline: "18 – 22 Days"
      },
      "pooja-room": {
        title: "Sacred Pooja Mandir",
        eyebrow: "Quiet Devotion & Craftsmanship",
        img: "assets/images/space-pooja-room.png",
        desc: "Handcrafted rosewood or Burma teak pediment with brass bell inlays, concealed oil-resistant drawers, back-lit translucent onyx stone backdrops, and acoustic tranquility.",
        materials: "Carved Teakwood, Translucent Onyx, Pure Brass Bell Inlays",
        lighting: "2700K Warm Gold Backlit Aura",
        storage: "Concealed drawers for brass lamps, oils, and sacred texts",
        timeline: "15 – 20 Days"
      },
      "living-hall": {
        title: "Family Living Hall",
        eyebrow: "Grand Scale & Togetherness",
        img: "assets/images/space-living-hall.png",
        desc: "The heart of the home. Seamlessly connects indoor elegance with outdoor light, featuring a custom TV media unit with hidden cable conduit, architectural false ceilings, and handcrafted sofa seating.",
        materials: "Reclaimed Teak, Italian Marble / Cool Granite, Velvet",
        lighting: "Layered Chandelier + Diffused Perimeter Coves",
        storage: "Floating credenza with concealed soundbar recess",
        timeline: "25 – 35 Days"
      },
      "dining-area": {
        title: "Generational Dining Area",
        eyebrow: "Shared Meals & Celebrations",
        img: "assets/images/space-dining-area.png",
        desc: "Crafted for Godavari hospitality. An 8-to-10-seater solid timber dining table anchored by brass accent pendant lighting, accompanied by a custom crockery display with fluted glass doors.",
        materials: "Solid Teak Top, Fluted Glass, Brushed Gold Hardware",
        lighting: "Low-hung sculptural warm pendant over table center",
        storage: "Built-in crockery buffet with cutlery organizer",
        timeline: "18 – 24 Days"
      }
    };

    const spaceModal = document.getElementById("spaceModal");
    function openSpaceModal(spaceKey) {
      const data = spaceData[spaceKey];
      if (!data) return;
      document.getElementById("spaceModalImg").src = data.img;
      document.getElementById("spaceModalTitle").textContent = data.title;
      document.getElementById("spaceModalEyebrow").textContent = data.eyebrow;
      document.getElementById("spaceModalDesc").textContent = data.desc;
      document.getElementById("spaceModalMaterials").textContent = data.materials;
      document.getElementById("spaceModalLighting").textContent = data.lighting;
      document.getElementById("spaceModalStorage").textContent = data.storage;
      document.getElementById("spaceModalTimeline").textContent = data.timeline;
      spaceModal.showModal();
      lockBodyScroll();
    }

    function closeSpaceModal() {
      spaceModal.close();
      unlockBodyScroll();
    }

    // 6. Consultation Modal
    const consultModal = document.getElementById("consultModal");
    function openConsultationModal(context = "") {
      if (context) {
        document.getElementById("cNotes").value = "Interested in: " + context + ". ";
      }
      consultModal.showModal();
      lockBodyScroll();
    }

    function closeConsultationModal() {
      consultModal.close();
      unlockBodyScroll();
    }

    function handleConsultSubmit(e) {
      e.preventDefault();
      const name = document.getElementById("cName").value;
      const phone = document.getElementById("cPhone").value;
      const loc = document.getElementById("cLocation").value;
      const notes = document.getElementById("cNotes").value;

      const message = "Hello Gayathri Sahityam Interiors, I would like to book a design consultation.%0A%0A*Name:* " + encodeURIComponent(name) + "%0A*Phone:* " + encodeURIComponent(phone) + "%0A*Location:* " + encodeURIComponent(loc) + "%0A*Notes:* " + encodeURIComponent(notes);
      window.open("https://wa.me/919876543210?text=" + message, "_blank");
      closeConsultationModal();
      alert("Thank you " + name + "! Opening WhatsApp to connect with our design team.");
    }

    // 7. Interactive Estimator Engine
    function setupPillGroup(containerId, callback) {
      const container = document.getElementById(containerId);
      if (!container) return;
      const buttons = container.querySelectorAll(".pill-btn");
      buttons.forEach(btn => {
        btn.addEventListener("click", () => {
          buttons.forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          callback();
        });
      });
    }

    function calculateEstimate() {
      const activeDwelling = document.querySelector("#optDwelling .pill-btn.active");
      const activeLoc = document.querySelector("#optLocation .pill-btn.active");
      const activeArea = document.querySelector("#optArea .pill-btn.active");
      const activeTier = document.querySelector("#optTier .pill-btn.active");

      const multiplier = parseFloat(activeDwelling.dataset.multiplier || "1.0");
      const sqft = parseInt(activeArea.dataset.sqft || "2500");
      const baseRate = parseInt(activeTier.dataset.base || "1600");

      const lowEstimate = Math.round((sqft * baseRate * multiplier * 0.9) / 100000);
      const highEstimate = Math.round((sqft * baseRate * multiplier * 1.1) / 100000);

      document.getElementById("estResultDisplay").textContent = "₹ " + lowEstimate + " – " + highEstimate + " Lakhs";
      document.getElementById("resHome").textContent = activeDwelling.textContent;
      document.getElementById("resArea").textContent = "~" + sqft.toLocaleString() + " sq.ft.";
      document.getElementById("resLoc").textContent = activeLoc.dataset.val;

      // Update WhatsApp link
      const text = "Hello Gayathri Sahityam Interiors! I used your website estimator for my home in " + encodeURIComponent(activeLoc.dataset.val) + ":%0A- *Type:* " + encodeURIComponent(activeDwelling.textContent) + "%0A- *Area:* ~" + sqft + " sq.ft.%0A- *Estimated Tier:* " + encodeURIComponent(activeTier.textContent) + "%0A- *Estimated Budget:* ₹" + lowEstimate + "-" + highEstimate + " Lakhs.%0AI would like to schedule a consultation.";
      document.getElementById("estWhatsAppLink").href = "https://wa.me/919876543210?text=" + text;
    }

    setupPillGroup("optDwelling", calculateEstimate);
    setupPillGroup("optLocation", calculateEstimate);
    setupPillGroup("optArea", calculateEstimate);
    setupPillGroup("optTier", calculateEstimate);

    function handleEstimatorSubmit(e) {
      e.preventDefault();
      const name = document.getElementById("estName").value;
      const phone = document.getElementById("estPhone").value;
      const activeDwelling = document.querySelector("#optDwelling .pill-btn.active").textContent;
      const activeLoc = document.querySelector("#optLocation .pill-btn.active").dataset.val;
      const estText = document.getElementById("estResultDisplay").textContent;

      const text = "Hello Gayathri Sahityam Interiors!%0A*Name:* " + encodeURIComponent(name) + "%0A*Phone:* " + encodeURIComponent(phone) + "%0A*Location:* " + encodeURIComponent(activeLoc) + "%0A*Dwelling:* " + encodeURIComponent(activeDwelling) + "%0A*Calculated Investment:* " + encodeURIComponent(estText) + "%0APlease share the detailed project catalog and proposal.";
      window.open("https://wa.me/919876543210?text=" + text, "_blank");
    }

    calculateEstimate();

    // Close dialogs on outside click
    [spaceModal, consultModal].forEach(modal => {
      modal.addEventListener("click", (e) => {
        const rect = modal.getBoundingClientRect();
        const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height && rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
        if (!isInDialog) {
          modal.close();
          unlockBodyScroll();
        }
      });
    });