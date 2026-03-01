# 🎯 Quality Gate - Informe de Implementación

## 📋 Información del Proyecto

- **Repositorio GitHub**: https://github.com/AlejandroPiresHerrera/movies-api-gate
- **SonarCloud**: https://sonarcloud.io/project/overview?id=AlejandroPiresHerrera_movies-api-gate
- **Pipeline**: https://github.com/AlejandroPiresHerrera/movies-api-gate/actions

---

## 🔍 ¿Qué detecta SonarCloud?

SonarCloud es una herramienta de análisis estático de código que detecta:
- **Code Smells**: Código difícil de mantener o con malas prácticas
- **Bugs**: Errores potenciales que pueden causar fallos en tiempo de ejecución
- **Vulnerabilidades de seguridad**: Código que puede ser explotado
- **Duplicación de código**: Bloques repetidos que deberían refactorizarse
- **Deuda técnica**: Estimación del tiempo necesario para arreglar problemas
- **Cobertura de tests**: Porcentaje de código ejecutado por los tests
- **Complejidad ciclomática**: Mide la complejidad de las funciones

---

## 🚪 ¿Qué es un Quality Gate?

Un **Quality Gate** es un conjunto de condiciones o umbrales que el código debe cumplir antes de ser considerado "apto para producción". Actúa como una barrera de calidad que previene que código defectuoso llegue a producción.

En este proyecto, el Quality Gate verifica:
- ✅ Lint sin errores (ESLint)
- ✅ Tests unitarios exitosos (Jest)
- ✅ Coverage mínimo: 70% líneas, 70% statements, 60% funciones, 50% branches
- ✅ SonarCloud: sin vulnerabilidades críticas ni bugs
- ✅ Build exitoso (compilación de TypeScript)

Si **cualquiera** falla, el pipeline completo falla y el merge se bloquea.

---

## 📊 ¿Qué es Coverage (Cobertura)?

**Coverage** mide el porcentaje de código que es ejecutado por los tests automatizados. Existen varios tipos:

- **Lines Coverage**: % de líneas de código ejecutadas durante los tests
- **Statements Coverage**: % de instrucciones ejecutadas
- **Functions Coverage**: % de funciones/métodos invocados
- **Branches Coverage**: % de ramas condicionales probadas (if/else, switch, etc.)

**¿Por qué es importante?** Un coverage bajo indica que hay código sin probar, lo que aumenta el riesgo de bugs no detectados. En este proyecto, establecimos umbrales mínimos para garantizar que al menos el 70% del código esté cubierto por tests.

---

## 👃 ¿Qué es un Code Smell?

Un **Code Smell** es una característica del código que indica un posible problema de diseño o mantenibilidad, aunque el código funcione correctamente. No es un bug, pero hace el código más difícil de entender, modificar o extender.

**Ejemplos comunes**:
- **Alta complejidad ciclomática**: funciones con muchos if/else anidados (como la que creamos intencionalmente)
- **Funciones demasiado largas**: difíciles de entender y probar
- **Código duplicado**: violación del principio DRY (Don't Repeat Yourself)
- **Variables no utilizadas**: ruido que confunde al lector
- **Nombres poco descriptivos**: `x`, `temp`, `data` sin contexto

**En este proyecto**: Introdujimos intencionalmente una función con 5 niveles de if anidados (alta complejidad) y la refactorizamos usando *early returns* para reducir la complejidad de 6 a 1.

---

## 🏆 Demostración de Aprendizaje - Historial de Commits

### ❌ Commits con fallos intencionados:

1. **`test: introduce lint error (unused variable) - intentional fail`**
   - Fallo: Variable no utilizada que viola reglas de ESLint
   
2. **`test: introduce failing test (wrong expectation) - intentional fail`**
   - Fallo: Test con expectativa incorrecta que hace fallar la suite

3. **`test: introduce code smell (high cyclomatic complexity) - intentional fail`**
   - Fallo: Función con 5 niveles de if anidados (complejidad 6)

4. **`test: introduce coverage drop (untested methods) - intentional fail`**
   - Fallo: Métodos nuevos sin tests que bajan la cobertura bajo el 70%

### ✅ Commits correctivos:

5. **`fix: remove unused variable to pass lint check`**
   - Solución: Eliminada variable no utilizada

6. **`fix: correct test expectation to pass unit tests`**
   - Solución: Expectativa corregida para pasar el test

7. **`refactor: reduce cyclomatic complexity using early returns`**
   - Solución: Refactorización con early returns (complejidad reducida de 6 a 1)

8. **`test: add comprehensive tests to restore coverage threshold`**
   - Solución: Tests completos para todos los métodos (coverage 100%)

9. **`fix: resolve lint issues in test file (unbound-method)`**
   - Solución: Uso correcto de spies en tests para evitar errores de lint

---

## 🤔 ¿Qué ha sido lo más complicado?

**Lo más desafiante** fue coordinar todas las piezas del Quality Gate para que trabajen juntas:

1. **Configurar SonarCloud correctamente**: Entender la estructura del `sonar-project.properties`, especialmente las rutas de coverage (lcov.info) y las exclusiones correctas para evitar falsos positivos.

2. **Gestionar los thresholds de coverage**: Equilibrar entre un umbral realista (70%) y mantener la cobertura alta requirió diseñar tests exhaustivos sin caer en tests triviales que no aportan valor.

3. **Resolver conflictos entre herramientas**: ESLint detectaba problemas de código (como `unbound-method`) que requerían patrones específicos en los tests (guardar spies en variables), lo cual no es obvio al principio.

4. **GitHub Actions con secrets**: Configurar `SONAR_TOKEN` como secret y asegurar que el workflow tenga permisos correctos para conectar con SonarCloud.

5. **Debugging de pipelines fallidos**: Cuando el pipeline falla en GitHub Actions, el feedback no siempre es inmediato ni claro, requiriendo múltiples iteraciones para identificar la causa raíz.

El aprendizaje clave es que un Quality Gate robusto requiere consistencia y disciplina: cada commit debe pasar todos los checks, sin excepciones.

---

## 📸 Capturas de Evidencia

### ✅ Pipeline en Verde
![GitHub Actions Success](docs/pipeline-success.png)

### ✅ SonarCloud Quality Gate PASSED
![SonarCloud Quality Gate](docs/sonarcloud-passed.png)

### 📊 Coverage Report
![Coverage Report](docs/coverage-report.png)

---

## 🛠️ Cómo Ejecutar Localmente

```bash
# Instalar dependencias
npm install

# Ejecutar tests con coverage
npm run test:cov

# Ejecutar lint
npm run lint

# Build del proyecto
npm run build
```

---

## 📚 Referencias

- [SonarCloud Documentation](https://docs.sonarcloud.io/)
- [Jest Coverage](https://jestjs.io/docs/configuration#collectcoverage-boolean)
- [ESLint Rules](https://eslint.org/docs/latest/rules/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)

---

**Autor**: Alejandro Pires Herrera  
**Fecha**: 1 de Marzo, 2026  
**Proyecto**: Movies API Gate con Quality Gate completo
