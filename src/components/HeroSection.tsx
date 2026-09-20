"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Box,
  Typography,
  Button,
  Container,
  Fab,
  keyframes,
} from "@mui/material";
import {
  WhatsApp as WhatsAppIcon,
  ArrowUpward as ArrowUpwardIcon,
} from "@mui/icons-material";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { SlideUpInView } from "@/components/animations";
import OptimizedImage from "@/components/OptimizedImage";
import { THEME } from "@/constants/theme";
import { HeroImages } from "../../public/images";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width:900px)");
  const { t } = useLanguage();
  const [showWhatsAppFab, setShowWhatsAppFab] = useState(false);

  useEffect(() => {
    setShowWhatsAppFab(true);
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (heroRef.current) {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            heroRef.current.style.transform = `translateY(${parallax}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bounce = keyframes`
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  `;

  const pulse = keyframes`
    0% {
      opacity: 0.1;
    }
    50% {
      opacity: 0.3;
    }
    100% {
      opacity: 0.1;
    }
  `;

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: "100vh", sm: "80vh", md: "70vh", lg: "60vh" },
        minHeight: { xs: "600px", sm: "700px", md: "800px", lg: "995px" },
        maxHeight: "995px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Background Image */}
      <Box
        ref={heroRef}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
        }}
      >
        {/* Hero Image Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            "& img": {
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center center",
            },
          }}
        >
          <OptimizedImage
            src={HeroImages.src || HeroImages}
            alt="Event Force Hero Background - Premium Transportation Services"
            fill
            priority
            quality={70}
            sizes="100vw"
            objectFit="cover"
            objectPosition="center center"
          />
        </Box>

        {/* Dark Overlay for Text Readability */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            zIndex: 1,
          }}
        />
      </Box>

      {/* Content */}
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 3,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            color: "white",
            py: { xs: 4, sm: 4 },
            px: { xs: 2, sm: 3, md: 4 },
            width: "100%",
          }}
        >
          {/* Main Title */}
          <SlideUpInView immediate>
            <Typography
              variant={isMobile ? "h3" : "h1"}
              component="h1"
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: { xs: 700, sm: 600, md: 600 },
                mb: { xs: 2, sm: 3, md: 4 },
                lineHeight: { xs: 1.1, sm: 1.2, md: 1.2 },
                fontSize: {
                  xs: "1.75rem",
                  sm: "2.5rem",
                  md: "3.5rem",
                  lg: "4.5rem",
                  xl: "5rem",
                },
                "& .gradient-text": {
                  background: THEME.gradients.primary,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                },
              }}
            >
              <Box component="span" display="block">
                {t("hero.title")}
              </Box>
              <Box component="span" display="block" sx={{ color: "white" }}>
                {t("hero.title2")}
              </Box>
            </Typography>
          </SlideUpInView>

          {/* Subtitle */}
          <SlideUpInView immediate>
            <Typography
              variant={isMobile ? "h6" : "h5"}
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: { xs: 400, sm: 300, md: 300 },
                mb: { xs: 3, sm: 4, md: 6 },
                maxWidth: { xs: "100%", sm: "90%", md: "800px" },
                mx: "auto",
                opacity: 0.9,
                lineHeight: { xs: 1.5, sm: 1.6, md: 1.6 },
                fontSize: { xs: "0.875rem", sm: "1rem", md: "1.25rem" },
                letterSpacing: { xs: "0.3px", sm: "0.5px", md: "0.5px" },
                px: { xs: 2, sm: 0, md: 0 },
              }}
            >
              {t("hero.subtitle")}
            </Typography>
          </SlideUpInView>

          {/* CTA Buttons */}
          <SlideUpInView immediate>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: { xs: 2, sm: 3, md: 3 },
                justifyContent: "center",
                alignItems: "center",
                pt: { xs: 2, sm: 3, md: 4 },
              }}
            >
              <Button
                component={Link}
                href="/our-fleet"
                variant="contained"
                sx={{
                  backgroundColor: THEME.colors.primary,
                  borderRadius: "8px",
                  px: 3,
                  py: 1.25,
                  fontSize: "1rem",
                  fontWeight: "bold",
                  textTransform: "none",
                  width: "193px",
                  height: "48px",
                  "&:hover": {
                    backgroundColor: THEME.colors.primaryDark,
                    transform: "scale(1.05)",
                  },
                  transition: "all 0.3s",
                }}
              >
                {t("hero.bookNow")}
              </Button>
              <Button
                component={Link}
                href="/about-us"
                variant="outlined"
                sx={{
                  borderRadius: "8px",
                  px: 3,
                  py: 1.25,
                  fontSize: "1rem",
                  fontWeight: "bold",
                  textTransform: "none",
                  borderColor: "white",
                  color: "white",
                  width: "193px",
                  height: "48px",
                  borderWidth: "1px",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  "&:hover": {
                    backgroundColor: "white",
                    color: THEME.colors.primary,
                    transform: "scale(1.05)",
                  },
                  transition: "all 0.3s",
                }}
              >
                {t("hero.learnMore")}
                <ArrowUpwardIcon
                  sx={{ fontSize: "16px", transform: "rotate(45deg)" }}
                />
              </Button>
            </Box>
          </SlideUpInView>
        </Box>
      </Container>

      {/* Floating WhatsApp Button — client-only to avoid hydration mismatch */}
      {showWhatsAppFab && (
        <Fab
          color="success"
          aria-label="Contact us on WhatsApp - Opens in new window"
          onClick={() => {
            const phoneNumber = "+966594279012";
            const message =
              "Hello! I would like to know more about Event Force services.";
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, "_blank", "noopener,noreferrer");
          }}
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 1000,
            "&:hover": {
              transform: "scale(1.1)",
            },
            "&:focus": {
              outline: "2px solid #25D366",
              outlineOffset: "2px",
            },
            transition: "transform 0.3s",
            cursor: "pointer",
          }}
        >
          <WhatsAppIcon />
        </Fab>
      )}

      {/* Scroll Indicator */}
      <Box
        sx={{
          position: "absolute",
          bottom: { xs: 16, sm: 24, md: 32 },
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          animation: `${bounce} 2s infinite`,
          display: { xs: "none", sm: "block" },
        }}
      >
        <Box
          sx={{
            width: { xs: 20, sm: 24, md: 24 },
            height: { xs: 32, sm: 40, md: 40 },
            border: "2px solid white",
            borderRadius: "12px",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            pt: 1,
          }}
        >
          <Box
            sx={{
              width: 4,
              height: 12,
              backgroundColor: "white",
              borderRadius: "2px",
              animation: `${pulse} 1.5s infinite`,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSection;
