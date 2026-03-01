# 📤 ENTREGA - Quality Gate

## 🔗 Enlaces Requeridos

### 1️⃣ URL del Repositorio GitHub
```
https://github.com/AlejandroPiresHerrera/movies-api-gate
```

### 2️⃣ URL del Proyecto en SonarCloud
```
https://sonarcloud.io/project/overview?id=AlejandroPiresHerrera_movies-api-gate
```

### 3️⃣ URL del Pipeline (GitHub Actions)
```
https://github.com/AlejandroPiresHerrera/movies-api-gate/actions
```

### 4️⃣ Última Ejecución del Pipeline
```
https://github.com/AlejandroPiresHerrera/movies-api-gate/actions/workflows/quality.yml
```

---

## 📸 Capturas Requeridas

### ✅ Pipeline en Verde
**Ubicación**: `.github/workflows/quality.yml`  
**Captura**: GitHub Actions → Pestaña "Actions" → Ver última ejecución exitosa

### ✅ SonarCloud Quality Gate PASSED
**Ubicación**: SonarCloud Dashboard  
**Captura**: Ver métricas de calidad del proyecto en SonarCloud

---

## 📝 Explicación Breve (Máximo 10 líneas por sección)

### ¿Qué detecta Sonar?
SonarCloud analiza el código estático para detectar code smells (malas prácticas), bugs potenciales, vulnerabilidades de seguridad, duplicación de código, y calcula métricas como cobertura y complejidad ciclomática. En este proyecto detectó la función con alta complejidad (6 niveles de if anidados) y la bajada de coverage cuando agregamos métodos sin tests.

### ¿Qué es un Quality Gate?
Un Quality Gate es un conjunto de condiciones que el código debe cumplir para considerarse "production-ready". En este proyecto, el código debe pasar lint (ESLint), tests unitarios con 70% de coverage mínimo, build exitoso, y análisis de SonarCloud sin fallos críticos. Si cualquier check falla, el merge al main branch se bloquea automáticamente.

### ¿Qué es Coverage?
Coverage (cobertura) mide el porcentaje de código ejecutado por los tests. Incluye líneas (70%), statements (70%), funciones (60%) y branches/ramas condicionales (50%). Un coverage alto indica que la mayoría del código está probado, reduciendo el riesgo de bugs no detectados. En este proyecto alcanzamos 100% de coverage.

### ¿Qué es un Code Smell?
Un Code Smell es una característica del código que sugiere un problema de diseño aunque funcione correctamente. No es un bug, pero dificulta la mantenibilidad. Ejemplos: funciones complejas con muchos if/else anidados, código duplicado, variables no usadas, nombres poco descriptivos. Provocamos uno intencionalmente con una función de complejidad 6 y lo refactorizamos a complejidad 1.

### ¿Qué ha sido lo más complicado?
Lo más desafiante fue configurar SonarCloud correctamente (rutas de coverage, exclusiones) y coordinar todas las herramientas para que trabajen juntas sin conflictos. También gestionar los umbrales de coverage para mantenerlos altos sin caer en tests triviales, y resolver problemas de ESLint en tests (unbound-method) que requieren patrones específicos de código.

---

## 🎯 Demostración de Fallos y Correcciones

### ❌ Commits con Fallos Intencionados
1. `4aa1778` - **Fallo de Lint**: Variable no utilizada
2. `3bf4124` - **Fallo de Test**: Expectativa incorrecta
3. `f05d6be` - **Code Smell**: Alta complejidad ciclomática (6 niveles if)
4. `c38eff3` - **Bajada de Coverage**: Métodos sin tests

### ✅ Commits Correctivos
5. `4585666` - **Fix Lint**: Eliminada variable no usada
6. `4586095` - **Fix Test**: Expectativa corregida
7. `f410ed4` - **Refactor**: Reducida complejidad con early returns
8. `2622b1c` - **Tests**: Cobertura completa (100%)
9. `b9c791c` - **Fix Lint Tests**: Resuelto unbound-method

### 📚 Documentación Final
10. `4640a77` - Documentación completa con badges y explicación

---

## ✅ Verificación Final

### Tests Locales
```bash
npm run lint        # ✅ PASS
npm run test:cov    # ✅ PASS (100% coverage)
npm run build       # ✅ PASS
```

### Pipeline
- ✅ GitHub Actions ejecutándose automáticamente en cada push
- ✅ Todos los steps pasando: install, lint, build, test, coverage, sonar

### SonarCloud
- ✅ Quality Gate: PASSED
- ✅ Coverage: 100%
- ✅ 0 Bugs
- ✅ 0 Vulnerabilities
- ✅ Code Smells: Resueltos

---

## 📚 Archivos Clave del Proyecto

- `.github/workflows/quality.yml` - Pipeline de CI/CD
- `sonar-project.properties` - Configuración de SonarCloud
- `package.json` - Thresholds de coverage
- `QUALITY_GATE.md` - Documentación detallada
- `README.md` - Badges y enlaces rápidos

---

**Alumno**: Alejandro Pires Herrera  
**Email**: alejandropires478@gmail.com  
**Fecha de Entrega**: 1 de Marzo, 2026  
**Estado**: ✅ COMPLETADO
